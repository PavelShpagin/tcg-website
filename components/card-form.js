"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
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
    CardName: "",
    LvL: "",
    Cost: "",
    Attack: "",
    Health: "",
    CardText: "",
    Class: "",
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
        CardName: "",
        LvL: "",
        Cost: "",
        Attack: "",
        Health: "",
        CardText: "",
        Class: nextImage.class,
      });
      setMinScale(scale);
      setImageScale(scale);
      setImagePosition(position);
      setErrors({});
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectorChange = (value) => {
    setCardData((prev) => ({ ...prev, Class: value }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm(cardData, activeTab);
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    setUploading(true);

    try {
      // Get the SVG element directly
      const svgElement = document.querySelector("#card-template");
      if (!svgElement) {
        console.error("SVG element not found");
        throw new Error("SVG element not found");
      }

      // Convert the SVG's image href to base64
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

      // Convert SVG element to base64
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = 368 * 4;
      canvas.height = 500 * 4;
      canvas.style.width = 368 * 4 + "px";
      canvas.style.height = 500 * 4 + "px";

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw SVG as an image on the canvas, then convert to webp
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

      // Prepare form data
      const formData = new FormData(event.target);
      if (base64Image) {
        const imageBlob = await (await fetch(base64Image)).blob();
        formData.append("image_file", imageBlob, "image.png");
      }
      formData.append("scale", imageScale);
      formData.append("position", JSON.stringify(imagePosition));
      formData.append("card_file", webpBlob, "card.webp");
      formData.append("title", cardData.CardName);
      formData.append("description", cardData.CardText);
      formData.append("class", cardData.Class);
      formData.append("level", cardData.LvL);
      formData.append("attack", cardData.Attack);
      formData.append("health", cardData.Health);
      formData.append("type", activeTab);
      formData.append("cost", cardData.Cost);

      // Send the POST request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-card`, 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Ensure any state updates or data fetching is completed here
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // Optional delay for server processing

        toast({
          title: "Success",
          description: "You successfully created a card.",
          variant: "success",
        });
        router.push("/cards-official");
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

      setImagePosition(constrainPosition(newPosition, imageScale, imageWidth.current, imageHeight.current, 368, 500));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = ([value]) => {
    setImageScale(value);
    setImagePosition((prevPosition) => constrainPosition(prevPosition, value, imageWidth.current, imageHeight.current, 368, 500));
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  useEffect(() => {
    if (images?.length > 0) {
      handleNewCard();
    }
  }, [images]);

  return (
    <div>
      <div className="space-x-1 ml-7">
        {["Minion", "Spell", "Stage"].map((tab, index) => (
          <button
            key={tab}
            className={`px-4 py-2 text-lg font-bold rounded-t-xl backdrop-blur-xl shadow-lg ${
              activeTab === tab
                ? "bg-black text-white bg-opacity-60"
                : "bg-black text-gray-300 bg-opacity-30"
            } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!uploading) {
                setActiveTab(tab);
                setErrors({});
              }
            }}
            disabled={uploading}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-black bg-opacity-60 backdrop-blur-xl pl-10 pt-10 pr-10 pb-3 rounded-3xl shadow-lg flex space-x-10">
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={
                    uploading || isDisabled(activeTab, "LvL")
                      ? "opacity-30"
                      : undefined
                  }
                >
                  <Label>
                    LvL
                    <span className="text-red-400 ml-1">{errors.LvL}</span>
                  </Label>
                  <Input
                    name="LvL"
                    type="number"
                    placeholder="LvL"
                    disabled={uploading || isDisabled(activeTab, "LvL")}
                    value={cardData.LvL}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.LvL && "border-2 border-red-400"}
                  />
                </div>
                <div className={uploading ? "opacity-30" : undefined}>
                  <Label>
                    Card Name
                    <span className="text-red-400 ml-1">{errors.CardName}</span>
                  </Label>
                  <Input
                    name="CardName"
                    type="text"
                    placeholder="Enter card name"
                    value={cardData.CardName}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.CardName && "border-2 border-red-400"}
                    disabled={uploading}
                  />
                </div>
                <div className={uploading ? "opacity-30" : undefined}>
                  <Label>
                    Cost
                    <span className="text-red-400 ml-1">{errors.Cost}</span>
                  </Label>
                  <Input
                    name="Cost"
                    type="text"
                    placeholder="Cost"
                    value={cardData.Cost}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.Cost && "border-2 border-red-400"}
                    disabled={uploading}
                  />
                </div>
                <div className={uploading ? "opacity-30" : undefined}>
                  <Label>
                    Class
                    <span className="text-red-400 ml-1">{errors.Class}</span>
                  </Label>
                  {cardData.Class && (
                    <Selector
                      name="Class"
                      placeholder="Blue"
                      items={["Blue", "Purple"]}
                      value={cardData.Class}
                      onChange={handleSelectorChange}
                      onFocus={handleFocus}
                      disabled={uploading}
                    />
                  )}
                </div>
              </div>
              <div className={uploading ? "opacity-30" : undefined}>
                <Label>Card Text</Label>
                <Textarea
                  name="CardText"
                  rows="3"
                  placeholder="Enter card text"
                  value={cardData.CardText}
                  onChange={handleInputChange}
                  disabled={uploading}
                ></Textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={
                    uploading || isDisabled(activeTab, "Attack")
                      ? "opacity-30"
                      : undefined
                  }
                >
                  <Label>
                    Attack
                    <span className="text-red-400 ml-1">{errors.Attack}</span>
                  </Label>
                  <Input
                    name="Attack"
                    type="number"
                    placeholder="Attack"
                    disabled={isDisabled(activeTab, "Attack")}
                    value={cardData.Attack}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.Attack && "border-2 border-red-400"}
                  />
                </div>
                <div
                  className={
                    uploading || isDisabled(activeTab, "Health")
                      ? "opacity-30"
                      : undefined
                  }
                >
                  <Label>
                    Health
                    <span className="text-red-400 ml-1">{errors.Health}</span>
                  </Label>
                  <Input
                    name="Health"
                    type="number"
                    placeholder="Health"
                    disabled={isDisabled(activeTab, "Health") || uploading}
                    value={cardData.Health}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={
                      errors.Health ? "border-2 border-red-400" : undefined
                    }
                  />
                </div>
              </div>
              <div
                className={`grid w-full max-w-sm gap-1.5 ${
                  uploading ? "opacity-30" : undefined
                }`}
              >
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  className="font-medium text-white [&::file-selector-button]:text-gray-300 text-opacity-100 font-bold"
                  onChange={handleImageChange}
                  onFocus={handleFocus}
                  disabled={uploading}
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="font-semibold"
                  disabled={uploading}
                >
                  Submit
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  className="font-semibold"
                  onClick={handleNewCard}
                  disabled={uploading}
                >
                  New
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center relative group">
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
            //viewBox="0 0 368 500"
            // preserveAspectRatio="xMidYMid meet"
          />

          <div className="flex justify-center items-center space-x-2 mt-2.5">
            <div
              className={`flex items-center justify-center gap-3 
                p-1.5 px-2.5 
                backdrop-blur-[1px] rounded-full 
                transition-all duration-300 
                group-hover:backdrop-blur-[1px]
                ${uploading ? "opacity-30" : ""}`}
            >
              <Slider
                value={[imageScale]}
                onValueChange={handleScaleChange}
                min={minScale}
                max={minScale + 0.5}
                step={0.01}
                disabled={uploading}
              />
            </div>
            <button
              onClick={handleFlip}
              className={`w-8 h-8 bg-black bg-opacity-60 text-white rounded-full flex items-center justify-center ${uploading ? "opacity-30" : ""}`}
              disabled={uploading}
            >
              <FaArrowsAltH disabled={uploading} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
