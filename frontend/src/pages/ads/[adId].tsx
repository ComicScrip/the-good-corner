import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

const GET_ONE_AD = gql`
  query GetAdById($adId: Int!) {
    getAdById(adId: $adId) {
      id
      title
      price
      picture
      location
      owner
      description
    }
  }
`;

export type AdDetail = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

export default function AdDetails() {
  const router = useRouter();
  const { adId } = router.query;

  const { data } = useQuery<{ getAdById: AdDetail }>(GET_ONE_AD, {
    variables: { adId: typeof adId === "string" ? parseInt(adId, 10) : "" },
    skip: typeof adId === "undefined",
  });

  const ad = data?.getAdById;

  return (
    <Layout title={ad?.title ? ad.title + " - TGC" : "The Good Corner"}>
      <div className="pt-12 pb-12">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          {typeof ad === "undefined" ? (
            "Chargement..."
          ) : (
            <div className="">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl">{ad.title}</h1>
                <p className="text-2xl">{ad.price} €</p>
              </div>

              <img src={ad.picture} alt={ad.title} className="mt-6 mb-6" />
              <p className="mt-6 mb-6">{ad.description}</p>
              <div className="flex justify-between mb-6">
                <div className="flex items-center mt-3">
                  <UserCircleIcon width={24} height={24} className="mr-2" />{" "}
                  {ad.owner}
                </div>

                <div className="flex items-center mt-2 ">
                  <MapPinIcon width={24} height={24} className="mr-2" />{" "}
                  {ad.location}
                </div>
              </div>

              <div className="flex justify-between border-t pt-2 items-center ">
                <Link
                  href={`/editAd/${ad.id}`}
                  className="flex items-center mt-3 cursor-pointer"
                >
                  <PencilSquareIcon width={24} height={24} className="mr-2" />
                  Editer l'annonce
                </Link>

                <div
                  className="flex items-center mt-3 cursor-pointer"
                  onClick={() => {
                    if (
                      confirm(
                        "Etes-vous certain.e de vouloir supprimer cette annonce ?"
                      )
                    )
                      axios
                        .delete(`http://localhost:4000/ads/${ad.id}`)
                        .then(() => {
                          router.push("/");
                        })
                        .catch(console.error);
                  }}
                >
                  <TrashIcon width={24} height={24} className="mr-2" />
                  Supprimer l'annonce
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
