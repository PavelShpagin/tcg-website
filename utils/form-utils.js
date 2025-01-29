export const validateForm = (cardData, activeTab) => {
  let newErrors = {};
  if (!cardData.title.trim()) newErrors.title = "(required)";
  if (
    (activeTab === "Minion" || activeTab === "Stage") &&
    !cardData.level.trim()
  )
    newErrors.level = "(required)";
  if (!cardData.cost.trim()) newErrors.cost = "(required)";
  if (activeTab === "Minion" && !cardData.attack.trim())
    newErrors.attack = "(required)";
  if (activeTab === "Minion" && !cardData.health.trim())
    newErrors.health = "(required)";

  return newErrors;
};

export const isDisabled = (activeTab, field = "") => {
  return (
    (activeTab !== "Minion" && (field === "attack" || field === "health")) ||
    (activeTab === "Spell" && field === "level")
  );
};
