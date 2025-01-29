import CardGallery from "@components/card-gallery";

export default async function CardsOfficial() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards-official`,
    {
      cache: "no-store",
    }
  );
  const cards = await response.json();

  return (
    <>
      <div
        className="bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/cards-official-bg.png')",
        }}
      >
        <div className="backdrop-blur-md">
          <CardGallery cards={cards} className="relative z-10" />
        </div>
      </div>
    </>
  );
}
