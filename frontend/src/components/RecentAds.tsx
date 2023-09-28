import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import { Ad } from "@/types";
import axios from "axios";

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    /*
    const fetchAds = async () => {
      try {
        const res = await axios.get<Ad[]>("http://localhost:4000/ads");
        setAds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAds();
    */
    axios
      .get<Ad[]>("http://localhost:4000/ads")
      .then((res) => setAds(res.data))
      .catch(console.error);
  }, []);

  const [total, setTotal] = useState(0);

  const handleAddPrice = (price: number) =>
    setTotal((oldTotal) => oldTotal + price);

  return (
    <>
      <h2>Annonces récentes</h2>
      Total : {total}
      <button className="button" onClick={() => setTotal(0)}>
        Reset
      </button>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            onAddPrice={handleAddPrice}
            key={ad.title}
            ad={ad}
            link={`/ads/${ad.id}`}
          />
        ))}
      </section>
    </>
  );
}
