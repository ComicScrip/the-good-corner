import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ad, Category } from "@/types";
import AdCard from "@/components/AdCard";
import queryString from "query-string";
import {
  useAdsQuery,
  useCreateAdMutation,
  useSearchAdsQuery,
} from "@/graphql/generated/schema";

export default function Search() {
  const router = useRouter();
  const categoryId =
    typeof router.query.categoryId === "string"
      ? parseInt(router.query.categoryId, 10)
      : undefined;
  const title = router.query.title as string;

  const { data } = useSearchAdsQuery({
    variables: { categoryId, title },
    skip: !router.isReady,
  });
  const ads = data?.ads || [];

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

      <div className="pt-6 pb-20 flex flex-wrap">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </div>
    </Layout>
  );
}
