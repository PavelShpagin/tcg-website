"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import CardTemplate from "@components/svg/card-template";
import Selector from "@components/selector";
import axios from "axios";
import html2canvas from "html2canvas";

export default function CardForm({ images }) {
  const [classes, setClasses] = useState([]);
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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem("currentImageIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const router = useRouter();

  const handleNewCard = function () {
    if (!images || images.length === 0) {
      toast({
        title: "Error",
        description: "No images available",
        variant: "destructive",
      });
      return;
    }

    const nextImage = images[currentImageIndex];
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    sessionStorage.setItem("currentImageIndex", newIndex);

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
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
    setErrors({});
  };

  useEffect(() => {
    if (images?.length > 0) {
      handleNewCard();
    }
  }, [images]);

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
      setImageFile(file);
      setCardImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!cardData.CardName.trim()) newErrors.CardName = "(required)";
    if (activeTab === "Minion" && !cardData.LvL.trim())
      newErrors.LvL = "(required)";
    if (activeTab !== "Stage" && !cardData.Cost.trim())
      newErrors.Cost = "(required)";
    if (activeTab === "Minion" && !cardData.Attack.trim())
      newErrors.Attack = "(required)";
    if (activeTab === "Minion" && !cardData.Health.trim())
      newErrors.Health = "(required)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setUploading(true);

    const svgElement = document.querySelector("#card-template");
    const canvas = await html2canvas(svgElement, {
      allowTaint: true,
      useCORS: true,
    });

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("imageFile", blob, "card.png");
      formData.append("CardName", cardData.CardName);
      formData.append("CardText", cardData.CardText);
      formData.append("Class", cardData.Class);
      formData.append("LvL", cardData.LvL);
      formData.append("Attack", cardData.Attack);
      formData.append("Health", cardData.Health);
      formData.append("Type", activeTab);

      if (activeTab !== "Stage") {
        formData.append("Cost", cardData.Cost);
      }

      const response = await axios.post("/api/create-card", formData);

      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Success",
          description: "You successfully created a card.",
          variant: "success",
        });
        router.push("/cards-official");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description:
            errorData.message || "An error occurred while creating the card.",
          variant: "destructive",
        });
      }
      setUploading(false);
    }, "image/png");
  };

  const isDisabled = (field = "") => {
    return (
      activeTab !== "Minion" &&
      (field === "LvL" || field === "Attack" || field === "Health")
    );
  };

  const fetchClasses = async () => {
    const response = await fetch("/api/classes", { method: "GET" });
    return response.json();
  };

  useEffect(() => {
    fetchClasses()
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) =>
        console.error("Failed to fetch classes:", error.message)
      );
  }, []);

  const constrainPosition = (pos, currentScale) => {
    const maxX = (97.367 * currentScale - 97.367) / 2;
    const maxY = (132.292 * currentScale - 132.292) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, pos.x)),
      y: Math.max(-maxY, Math.min(maxY, pos.y)),
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialX: imagePosition.x,
      initialY: imagePosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = (e.clientX - dragStart.x) * 0.05;
      const deltaY = (e.clientY - dragStart.y) * 0.05;

      const newPosition = {
        x: dragStart.initialX + deltaX,
        y: dragStart.initialY + deltaY,
      };

      setImagePosition(constrainPosition(newPosition, imageScale));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = ([value]) => {
    setImageScale(value);
    setImagePosition((prevPosition) => constrainPosition(prevPosition, value));
  };

  return (
    <div className="px-6 space-x-1">
      <div className="flex justify-start space-x-1 ml-7">
        {["Minion", "Spell", "Stage"].map((tab, index) => (
          <button
            key={tab}
            className={`px-4 py-2 text-lg font-bold rounded-t-xl backdrop-filter backdrop-blur-xl shadow-lg ${
              activeTab === tab
                ? "bg-black text-white bg-opacity-60"
                : "bg-black text-gray-300 bg-opacity-30"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setErrors({});
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-xl p-10 rounded-3xl shadow-lg flex flex-col max-w-5xl space-y-5">
        <div className="flex space-x-10">
          <div className="flex-1 space-y-4">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={
                    uploading || isDisabled("LvL") ? "opacity-30" : undefined
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
                    disabled={uploading || isDisabled("LvL")}
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
                <div
                  className={
                    uploading || activeTab === "Stage"
                      ? "opacity-30"
                      : undefined
                  }
                >
                  <Label>
                    Cost
                    <span className="text-red-400 ml-1">{errors.Cost}</span>
                  </Label>
                  <Input
                    name="Cost"
                    type="text"
                    disabled={uploading || activeTab === "Stage"}
                    placeholder="Cost"
                    value={activeTab === "Stage" ? "Free Stage" : cardData.Cost}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.Cost && "border-2 border-red-400"}
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
                      items={classes.map((cls) => cls.name)}
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
                    uploading || isDisabled("Attack") ? "opacity-30" : undefined
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
                    disabled={isDisabled("Attack")}
                    value={cardData.Attack}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className={errors.Attack && "border-2 border-red-400"}
                  />
                </div>
                <div
                  className={
                    uploading || isDisabled("Health") ? "opacity-30" : undefined
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
                    disabled={isDisabled("Health") || uploading}
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
                className={`grid w-full max-w-sm items-center gap-1.5 ${
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
            </form>
            <div className="flex space-x-4">
              <Button
                size="md"
                className="font-semibold"
                onClick={handleSubmit}
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
          <div className="relative group">
            <CardTemplate
              id="card-template"
              className={uploading ? "opacity-30" : undefined}
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
            />
            <div className="absolute left-1/2 bottom-[-25px] transform -translate-x-1/2 flex flex-col items-center gap-1.5 p-1.5 px-2.5 backdrop-blur-[1px] rounded-full transition-all duration-300 group-hover:backdrop-blur-[1px]">
              <Slider
                value={[imageScale]}
                onValueChange={handleScaleChange}
                min={1}
                max={3}
                step={0.1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
