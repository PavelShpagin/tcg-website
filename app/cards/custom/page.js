import CardGallery from "@components/card-gallery";
import SelectedCard from "@components/selected-card";
import Footer from "@components/footer";
/*
export const revalidate = 1;

export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

export const dynamicParams = true
*/
export default async function CardsCustom() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/custom`,
    {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        "CDN-Cache-Control": "no-store",
      }
    }
  );
  const cards = await response.json();

  return (
    <>
      <div className="bg-fixed bg-cover bg-center bg-[url('/cards-custom-bg.png')]">
        <CardGallery cards={cards} title="Custom Cards" />
      </div>
      <Footer />
    </>
  );
}
