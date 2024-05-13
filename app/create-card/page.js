"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Selector from "@components/selector";
import axios from "axios";

export default function CreateCard() {
  const placeholderUrl = "/card-placeholder.png";
  const [classes, setClasses] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [cardImage, setCardImage] = useState(placeholderUrl);
  const [activeTab, setActiveTab] = useState("Minion"); // default is Minion
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
    Class: "Blue",
  });
  const router = useRouter();

  useEffect(() => {
    fetch(placeholderUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "card-placeholder.png", {
          type: "image/png",
        });
        setImageFile(file);
      });
  }, []);

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
    console.log("Form Data:", cardData);

    const formData = new FormData();
    formData.append("imageFile", imageFile);
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
      // router.push("/minions"); // Navigate to minions listing or another appropriate page
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
        console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) =>
        console.error("Failed to fetch classes:", error.message)
      );
  }, []);

  return (
    <div
      className="bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/create-card-bg.png')", height: "100vh" }}
    >
      <div>
        <div className="px-6 space-x-1">
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
                  <div className={uploading ? "opacity-30" : undefined}>
                    <Label>
                      Card Name
                      <span className="text-red-400 ml-1">
                        {errors.CardName}
                      </span>
                    </Label>
                    <Input
                      name="CardName"
                      type="text"
                      placeholder="Enter card name"
                      value={cardData.CardName}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      className={errors.CardName && "border-2 border-red-400"}
                      disable={uploading}
                    />
                  </div>
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
                      value={
                        activeTab === "Stage" ? "Free Stage" : cardData.Cost
                      }
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
                    <Selector
                      name="Class"
                      placeholder="Blue"
                      items={classes.map((cls, index) => cls.name)}
                      value={cardData.Class}
                      onChange={handleSelectorChange}
                      onFocus={handleFocus}
                      disabled={uploading}
                    />
                  </div>
                  <div
                    className={
                      uploading || isDisabled("Attack")
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
                      disabled={isDisabled("Attack")}
                      value={cardData.Attack}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      className={errors.Attack && "border-2 border-red-400"}
                    />
                  </div>
                  <div
                    className={
                      uploading || isDisabled("Health")
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
                <div
                  className={`grid w-full max-w-sm items-center gap-1.5 ${
                    uploading ? "opacity-30" : undefined
                  }`}
                >
                  <Label>Upload Image</Label>
                  <Input
                    type="file"
                    className="font-medium"
                    onChange={handleImageChange}
                    onFocus={handleFocus}
                    disabled={uploading}
                  />
                </div>
              </form>
              <Button
                size="md"
                className="font-semibold"
                onClick={handleSubmit}
                disabled={uploading}
              >
                Submit
              </Button>
            </div>
            <Image
              className={uploading ? "opacity-30" : undefined}
              src={cardImage}
              width={368}
              height={500}
              alt="Card Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
