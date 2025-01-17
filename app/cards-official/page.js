import CardGallery from "@components/card-gallery";

export default async function CardsOfficial() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cards-official`, {
    cache: "no-store",
  });
  const cards = await response.json();

  return (
    <div
      className="relative bg-cover min-h-screen"
      style={{
        backgroundImage: "url('/cards-official-bg.png')",
      }}
    >
      <CardGallery cards={cards} />
    </div>
  );
}
