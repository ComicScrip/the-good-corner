import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import AdCard from "@/components/AdCard";
import { useSearchAdsQuery } from "@/graphql/generated/schema";
import qs from "query-string";

export default function Search() {
  const router = useRouter();
  const categoryId =
    typeof router.query.categoryId === "string"
      ? parseInt(router.query.categoryId, 10)
      : undefined;
  const title = router.query.title as string;
  const page = (router.query.page as string) || "1";

  const pageNumber = parseInt(page, 10);

  const perPage = 2;

  const searchParams = qs.parse(window.location.search) as any;

  const { data } = useSearchAdsQuery({
    variables: {
      categoryId,
      title,
      take: perPage,
      skip: (pageNumber - 1) * perPage,
    },
    skip: !router.isReady,
  });
  const ads = data?.ads.list || [];
  const { totalCount = 0 } = data?.ads || {};

  const numberOfPages = Math.ceil(totalCount / perPage);

  return (
    <Layout title="recherche - TGC">
      {ads.length === 0 && (
        <div>
          <p className="pb-4 pt-12">
            {" "}
            Aucune annonce ne corresspond à ces critères de recherche
          </p>

          <button
            className="btn btn-primary text-white"
            onClick={() => router.push("/search")}
          >
            Voir toutes les annonces
          </button>
        </div>
      )}

      {Array.from({ length: numberOfPages }).map((_, i) => (
        <button
          className="p-2 bg-gray-300 border-gray-400 rounded-full m-2"
          key={i}
          onClick={() => {
            router.push(
              `/search?${qs.stringify({
                ...searchParams,
                page: i + 1,
              })}`
            );
          }}
        >
          {i + 1}
        </button>
      ))}

      <div className="pt-6 pb-20 flex flex-wrap">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </div>
    </Layout>
  );
}
