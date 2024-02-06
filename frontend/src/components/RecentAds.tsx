import { useEffect } from "react";
import AdCard from "./AdCard";

export type RecentAd = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

import { useAdsQuery } from "@/graphql/generated/schema";

export default function RecentAds() {
  const { data, loading } = useAdsQuery();

  if (loading) return "Chargement...";

  const ads = data?.ads || [];

  return (
    <div className="pt-6">
      <h2 className="text-2xl mb-6">Annonces Récentes</h2>

      <section className="flex flex-wrap pb-24" data-testid="ads-list">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </section>
    </div>
  );
}
