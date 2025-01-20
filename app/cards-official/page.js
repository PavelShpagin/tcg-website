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
        className="fixed bg-cover bg-center min-h-screen w-full blur-lg"
        style={{
          backgroundImage: "url('/cards-official-bg.png')",
          zIndex: -1,
        }}
      ></div>
      <CardGallery cards={cards} className="relative z-10" />
    </>
  );
}
