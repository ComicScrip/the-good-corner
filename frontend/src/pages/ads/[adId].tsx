import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { UserCircleIcon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {
  useDeleteAdMutation,
  useGetAdByIdQuery,
  useProfileQuery,
} from "@/graphql/generated/schema";

export default function AdDetails() {
  const router = useRouter();
  const [deleteAd] = useDeleteAdMutation();
  const { adId } = router.query;
  const { data } = useGetAdByIdQuery({
    variables: { adId: typeof adId === "string" ? parseInt(adId, 10) : 0 },
    skip: typeof adId === "undefined",
  });

  const ad = data?.getAdById;

  const { data: currentUser } = useProfileQuery();

  const canEdit =
    currentUser?.profile.role === "admin" ||
    currentUser?.profile.id === ad?.owner.id;

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
              <div className="flex justify-between mb-2">
                <div className="flex items-center mt-3">
                  {ad.owner.avatar ? (
                    <img
                      className="rounded-full h-8 w-8 mr-2"
                      src={ad.owner.avatar}
                      alt={ad.owner.nickname}
                    />
                  ) : (
                    <UserCircleIcon width={24} height={24} className="mr-2" />
                  )}

                  {ad.owner.nickname}
                </div>

                <div className="flex items-center mt-2 ">
                  <LocationMarkerIcon width={24} height={24} className="mr-2" />{" "}
                  {ad.location}
                </div>
              </div>

              {canEdit && (
                <div className="flex justify-between border-t pt-2 items-center ">
                  <Link
                    href={`/editAd/${ad.id}`}
                    className="flex items-center mt-3 cursor-pointer"
                    data-testid="editAdBtn"
                  >
                    <PencilIcon width={24} height={24} className="mr-2" />
                    Editer l'annonce
                  </Link>

                  <div
                    className="flex items-center mt-3 cursor-pointer"
                    data-testid="deleteAdBtn"
                    onClick={() => {
                      if (
                        confirm(
                          "Êtes-vous certain.e de vouloir supprimer cette annonce ?"
                        )
                      )
                        deleteAd({ variables: { adId: ad.id } })
                          .then(() => router.push("/"))
                          .catch(console.error);
                    }}
                  >
                    <TrashIcon width={24} height={24} className="mr-2" />
                    Supprimer l'annonce
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
