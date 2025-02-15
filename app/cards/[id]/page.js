import CardGallery from "@components/card-gallery";
import Footer from "@components/footer";

export default async function UserProfile({ params, searchParams }) {
  const username = searchParams.username || "User";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/${params.id}?username=${username}`
  );
  const cards = await response.json();

  return (
    <>
      <div className="bg-fixed bg-cover bg-center bg-[url('/cards-user-bg.png')]">
        <CardGallery cards={cards} title={`${username}`} />
      </div>
      <Footer />
    </>
  );
}
