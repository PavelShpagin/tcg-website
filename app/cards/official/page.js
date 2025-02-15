import CardGallery from "@components/card-gallery";
import SelectedCard from "@components/selected-card";
import Footer from "@components/footer";

export default async function CardsOfficial() {
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/official`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/official`,
    {
      cache: "no-store",
      mode: "no-cors",
    }
  );
  const cards = await response.json();

  return (
    <>
      <div className="bg-fixed bg-cover bg-center bg-[url('/cards-official-bg.png')]">
        <CardGallery cards={cards} title="Official Cards" />
      </div>
      <Footer />
    </>
  );
}
