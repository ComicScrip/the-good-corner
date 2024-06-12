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

  const page =
    typeof router.query.page === "string" ? parseInt(router.query.page, 10) : 1;

  const perPage = 2;

  const { data, loading } = useSearchAdsQuery({
    variables: { categoryId, title, skip: (page - 1) * perPage, take: perPage },
    skip: !router.isReady,
  });
  const ads = data?.ads.list || [];
  const { totalCount = 0 } = data?.ads || {};
  const numberOfPages = Math.ceil(totalCount / perPage);

  const searchParams = qs.parse(window.location.search) as any;

  return (
    <Layout title="recherche - TGC">
      {!loading && ads.length === 0 && (
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

      <div className="flex items-center pt-6">
        <p className="mr-2">Page :</p>
        {new Array(numberOfPages).fill(null).map((_, pageNum) => (
          <button
            className="m-1 p-2 border border-gray-200 bg-gray-100 rounded-xl"
            key={pageNum + 1}
            onClick={() => {
              router.push(
                `/search?${qs.stringify({
                  ...searchParams,
                  page: pageNum + 1,
                })}`
              );
            }}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>

      <div className="pt-6 pb-20 flex flex-wrap">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </div>
    </Layout>
  );
}
