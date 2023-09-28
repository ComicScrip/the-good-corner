import Layout from "@/components/Layout";
import { Ad } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdDetails() {
  const router = useRouter();
  const { adId } = router.query;

  const [ad, setAd] = useState<Ad>();

  useEffect(() => {
    if (typeof ad === "undefined")
      axios
        .get<Ad>(`http://localhost:4000/ads/${adId}`)
        .then((res) => setAd(res.data))
        .catch(console.error);
  }, [adId]);

  return (
    <Layout title={`annonce ${adId}`}>
      {typeof ad === "undefined" ? (
        "Chargement..."
      ) : (
        <div>
          <h1>{ad.title}</h1>
          <p>postée par {ad.owner}</p>
          <p>a récupérer à {ad.location}</p>
          <img src={ad.picture} alt={ad.title} />
          <p>{ad.description}</p>
        </div>
      )}
    </Layout>
  );
}
