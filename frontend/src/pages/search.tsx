import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ad, Category } from "@/types";
import AdCard from "@/components/AdCard";
import queryString from "query-string";

export default function Search() {
  const router = useRouter();

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    axios
      .get<Ad[]>(`http://localhost:4000/ads${window.location.search}`)
      .then((res) => setAds(res.data))
      .catch(console.error);
  }, [router.query.title, router.query.categoryId]);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const currentCategoryName = categories.find(
    (c) => c.id.toString() === router.query.categoryId
  )?.name;

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
          <AdCard key={ad.title} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </div>
    </Layout>
  );
}
