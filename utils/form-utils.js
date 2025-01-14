export const validateForm = (cardData, activeTab) => {
  let newErrors = {};
  if (!cardData.CardName.trim()) newErrors.CardName = "(required)";
  if ((activeTab === "Minion" || activeTab === "Stage") && !cardData.LvL.trim())
    newErrors.LvL = "(required)";
  if (!cardData.Cost.trim()) newErrors.Cost = "(required)";
  if (activeTab === "Minion" && !cardData.Attack.trim())
    newErrors.Attack = "(required)";
  if (activeTab === "Minion" && !cardData.Health.trim())
    newErrors.Health = "(required)";

  return newErrors;
};

export const isDisabled = (activeTab, field = "") => {
  return (
    (activeTab !== "Minion" && (field === "Attack" || field === "Health")) ||
    (activeTab === "Spell" && field === "LvL")
  );
};
