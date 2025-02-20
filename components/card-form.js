"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@components/ui/slider";
import CardTemplate from "@components/svg/card-template";
import Selector from "@components/selector";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowsAltH } from "react-icons/fa";
import {
  calculateScaleAndPosition,
  constrainPosition,
} from "@utils/image-utils";
import { validateForm, isDisabled } from "@utils/form-utils";

export default function CardForm({ images }) {
  const [imageFile, setImageFile] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [activeTab, setActiveTab] = useState("Minion");
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [cardData, setCardData] = useState({
    title: "",
    level: "",
    cost: "",
    attack: "",
    health: "",
    description: "",
    class: "Blue",
  });
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [minScale, setMinScale] = useState(1);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentImageIndex = useRef(0);
  const imageWidth = useRef(0);
  const imageHeight = useRef(0);

  const router = useRouter();

  //==================================================
  // Handlers for new card, uploading, etc.
  //==================================================
  const handleNewCard = () => {
    if (!images || images.length === 0) {
      toast({
        title: "Error",
        description: "No images available",
        variant: "destructive",
      });
      return;
    }

    const nextImage = images[currentImageIndex.current];
    if (isNaN(currentImageIndex.current)) {
      currentImageIndex.current = 0;
    } else {
      currentImageIndex.current++;
    }
    const newIndex = currentImageIndex.current % images.length;
    currentImageIndex.current = newIndex;
    sessionStorage.setItem("currentImageIndex", newIndex);

    const img = new Image();
    img.src = nextImage.url;
    img.onload = () => {
      imageWidth.current = img.width;
      imageHeight.current = img.height;
      const { scale, position } = calculateScaleAndPosition(
        img.width,
        img.height,
        368,
        500
      );

      setCardImage(nextImage.url);
      setImageFile(
        new File([], nextImage.name, {
          type: `image/${nextImage.url.split(".").pop()}`,
        })
      );
      setActiveTab(nextImage.type);
      setCardData({
        title: "",
        level: "",
        cost: "",
        attack: "",
        health: "",
        description: "",
        class: nextImage.class,
      });
      setMinScale(scale);
      setImageScale(scale);
      setImagePosition(position);
      setErrors({});
    };
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => {
        imageWidth.current = img.width;
        imageHeight.current = img.height;
        const { scale, position } = calculateScaleAndPosition(
          img.width,
          img.height,
          368,
          500
        );
        setImageFile(file);
        setCardImage(imageUrl);
        setMinScale(scale);
        setImageScale(scale);
        setImagePosition(position);
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectorChange = (value) => {
    setCardData((prev) => ({ ...prev, class: value }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  //==================================================
  // Submit form & final card creation
  //==================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm(cardData, activeTab);
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    setUploading(true);

    try {
      const svgElement = document.querySelector("#card-template");
      if (!svgElement) throw new Error("SVG element not found");

      // Convert the SVG's <image> href to base64
      const imageElement = svgElement.querySelector("image");
      let base64Image = null;
      if (imageElement && imageElement.href.baseVal) {
        try {
          const response = await fetch(imageElement.href.baseVal);
          const blob = await response.blob();
          base64Image = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
          imageElement.setAttribute("href", base64Image);
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }

      // Convert entire SVG to base64
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Draw on canvas -> export to .webp
      const canvas = document.createElement("canvas");
      canvas.width = 368 * 4;
      canvas.height = 500 * 4;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const img = new Image();
      const webpBlob = await new Promise((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Canvas conversion failed"));
            },
            "image/webp",
            1.0
          );
          URL.revokeObjectURL(svgUrl);
        };
        img.onerror = () => {
          URL.revokeObjectURL(svgUrl);
          reject(new Error("Image loading failed"));
        };
        img.src = svgUrl;
      });

      // Build POST form data
      const formData = new FormData(event.target);
      if (base64Image) {
        const imageBlob = await (await fetch(base64Image)).blob();
        formData.append("image_file", imageBlob, "image.png");
      }
      formData.append("scale", imageScale);
      formData.append("position", JSON.stringify(imagePosition));
      formData.append("card_file", webpBlob, "card.webp");
      formData.append("title", cardData.title);
      formData.append("description", cardData.description);
      formData.append("class", cardData.class);
      formData.append("level", cardData.level);
      formData.append("attack", cardData.attack);
      formData.append("health", cardData.health);
      formData.append("type", activeTab);
      formData.append("cost", cardData.cost);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-card`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Success",
          description: "You successfully created a card.",
          variant: "success",
        });
        router.push("/cards/custom");
        router.refresh(); // testing
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating the card.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during submission.",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  //==================================================
  // Drag & Scale
  //==================================================
  const handleMouseDown = (e) => {
    if (uploading) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: imagePosition.x,
      initialY: imagePosition.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = (e.clientX - dragStart.current.x) * 0.05;
      const deltaY = (e.clientY - dragStart.current.y) * 0.05;

      const newPosition = {
        x: dragStart.current.initialX + deltaX,
        y: dragStart.current.initialY + deltaY,
      };

      setImagePosition(
        constrainPosition(
          newPosition,
          imageScale,
          imageWidth.current,
          imageHeight.current,
          368,
          500
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = ([value]) => {
    setImageScale(value);
    setImagePosition((prevPosition) =>
      constrainPosition(
        prevPosition,
        value,
        imageWidth.current,
        imageHeight.current,
        368,
        500
      )
    );
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  useEffect(() => {
    if (images?.length > 0) {
      handleNewCard();
    }
  }, [images?.length]);

  //==================================================
  // Render
  //==================================================
  return (
    <div className="relative mt-12 flex flex-col px-3 sm:px-6 md:px-12 pt-[8vh] sm:pt-[20vh] md:pt-[calc(70px+6vh)] pb-[4vh] sm:pb-[5.8vh] xl:scale-[80%] 2xl:scale-[100%] md:scale-[70%] scale-100">
      {/* Tab Switcher */}
      <div className="flex space-x-2 ml-3 ml-6">
        {["Minion", "Spell", "Stage"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (!uploading) {
                setActiveTab(tab);
                setErrors({});
              }
            }}
            disabled={uploading}
            className={`
              px-3 sm:px-5 py-1.5 sm:py-2 text-base sm:text-lg font-semibold rounded-t-xl 
              border-[2.5px] border-transparent 
              backdrop-blur-sm bg-[var(--primary)]
              hover:bg-opacity-50 transition-colors duration-300
              ${
                activeTab === tab
                  ? "bg-opacity-30 text-[var(--foreground)] border-l-[var(--create-card-border)] border-r-[var(--create-card-border)] border-t-[var(--create-card-border)]"
                  : "bg-opacity-20 text-gray-200 text-opacity-70"
              }
              ${uploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div
        className="
          flex flex-col md:flex-row
          bg-[var(--create-card-bg)] bg-opacity-[88%]
          border-[3.5px] border-[var(--create-card-border)]
          border-opacity-[33%]
          rounded-2xl
          overflow-hidden
          shadow-2xl
        "
      >
        {/* Left Column: Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 px-3 sm:px-5 py-4 sm:py-6 space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-2 gap-3">
            {/* LvL */}
            <div>
              <Label className="text-gray-100 font-bold">
                LvL
                {errors.level && (
                  <span className="text-red-400 text-sm ml-1">{errors.level}</span>
                )}
              </Label>
              <Input
                name="level"
                type="number"
                placeholder="Level"
                disabled={uploading || isDisabled(activeTab, "level")}
                value={cardData.level}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                  placeholder:text-gray-400
                  ${errors.level ? "border-red-500" : ""}
                `}
              />
            </div>

            {/* Card Name */}
            <div>
              <Label className="text-gray-100 font-bold">
                Card Name
                {errors.title && (
                  <span className="text-red-400 text-sm ml-1">
                    {errors.title}
                  </span>
                )}
              </Label>
              <Input
                name="title"
                type="text"
                placeholder="Enter card name"
                disabled={uploading}
                value={cardData.title}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                  placeholder:text-gray-400
                  ${errors.title ? "border-red-500" : ""}
                `}
              />
            </div>

            {/* Cost */}
            <div>
              <Label className="text-gray-100 font-bold">
                Cost
                {errors.cost && (
                  <span className="text-red-400 text-sm ml-1">{errors.cost}</span>
                )}
              </Label>
              <Input
                name="cost"
                type="text"
                placeholder="Cost"
                disabled={uploading}
                value={cardData.cost}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                  placeholder:text-gray-400
                  ${errors.cost ? "border-red-500" : ""}
                `}
              />
            </div>

            {/* Class Selector */}
            <div>
              <Label className="text-gray-100 font-bold">
                Class
                {errors.class && (
                  <span className="text-red-400 text-sm ml-1">
                    {errors.class}
                  </span>
                )}
              </Label>
              <Selector
                name="class"
                items={["Blue", "Purple"]}
                value={cardData.class}
                onChange={handleSelectorChange}
                disabled={uploading}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                `}
              />
            </div>
          </div>

          {/* Card Text */}
          <div>
            <Label className="text-gray-100 font-bold">Card Text</Label>
            <Textarea
              name="description"
              rows={3}
              placeholder="Enter card text..."
              disabled={uploading}
              value={cardData.description}
              onChange={handleInputChange}
              className={`
                bg-[var(--background)] bg-opacity-80
                text-[var(--foreground)]
                border-[2px] border-transparent
                focus:border-[var(--light-delimiter)]
                transition-colors duration-300
                placeholder:text-gray-400
                w-full
              `}
            />
          </div>

          {/* Attack / Health */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-gray-100 font-bold">
                Attack
                {errors.attack && (
                  <span className="text-red-400 text-sm ml-1">
                    {errors.attack}
                  </span>
                )}
              </Label>
              <Input
                name="attack"
                type="number"
                placeholder="Attack"
                disabled={uploading || isDisabled(activeTab, "attack")}
                value={cardData.attack}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                  placeholder:text-gray-400
                  ${errors.attack ? "border-red-500" : ""}
                `}
              />
            </div>
            <div>
              <Label className="text-gray-100 font-bold">
                Health
                {errors.health && (
                  <span className="text-red-400 text-sm ml-1">
                    {errors.health}
                  </span>
                )}
              </Label>
              <Input
                name="health"
                type="number"
                placeholder="Health"
                disabled={uploading || isDisabled(activeTab, "health")}
                value={cardData.health}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`
                  bg-[var(--background)] bg-opacity-80
                  text-[var(--foreground)]
                  border-[2px] border-transparent
                  focus:border-[var(--light-delimiter)]
                  transition-colors duration-300
                  placeholder:text-gray-400
                  ${errors.health ? "border-red-500" : ""}
                `}
              />
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <Label className="text-gray-100 font-bold">Upload Image</Label>
            <Input
              type="file"
              disabled={uploading}
              onChange={handleImageChange}
              className={`
                cursor-pointer
                bg-[var(--background)] bg-opacity-80
                text-gray-400
                file:cursor-pointer file:mr-4
                file:text-white
                border-[2px] border-transparent
                focus:border-[var(--light-delimiter)]
                transition-colors duration-300
                placeholder:text-gray-400
              `}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-2">
            <Button
              type="submit"
              disabled={uploading}
              className="
                button-purple font-bold px-6 py-2
                bg-gradient-to-r from-gray-600 to-gray-500
                hover:from-gray-500 hover:to-gray-400
                border-2 border-gray-300
                rounded-xl
                shadow-md
              "
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={handleNewCard}
              className="
                button-login font-bold px-6 py-2
                bg-white bg-opacity-10
                hover:bg-opacity-20
                border-2 border-gray-300
                rounded-xl
                shadow-md
              "
            >
              New
            </Button>
          </div>
        </form>

        {/* Right Column: Card Preview */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-3 sm:p-6">
            <CardTemplate
              imageUrl={cardImage}
              scale={imageScale}
              position={imagePosition}
              isDragging={isDragging}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              cardData={cardData}
              type={activeTab}
              disabled={uploading}
              flip={isFlipped}
            />

          {/* Controls for scale & flip */}
          <div className="mt-4 flex items-center gap-4">
            <div
              className={`
                flex items-center px-3 py-2
                bg-[var(--background)] bg-opacity-60
                border-2 border-[var(--light-delimiter)]
                rounded-full
                ${uploading ? "opacity-40" : ""}
              `}
            >
              <Slider
                value={[imageScale]}
                onValueChange={handleScaleChange}
                min={minScale}
                max={minScale + 0.5}
                step={0.01}
                disabled={uploading}
                className="w-28"
              />
            </div>

            <button
              onClick={handleFlip}
              disabled={uploading}
              className={`
                w-10 h-10 flex items-center justify-center 
                rounded-full shadow-md 
                bg-gray-600 bg-opacity-70 text-white
                hover:bg-opacity-90 transition-colors duration-300
                ${uploading ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <FaArrowsAltH />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
