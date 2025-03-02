import CardGallery from "@components/card-gallery";
import SelectedCard from "@components/selected-card";
import Footer from "@components/footer";

export const dynamic = 'force-dynamic';

// export const dynamicParams = true;

/*export const headers = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};*/

export default async function CardsCustom() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/custom`,
    {
      // Ensure no caching at the fetch level:
      cache: 'no-store',
      // next: { revalidate: 0 }
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
