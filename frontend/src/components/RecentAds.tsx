import AdCard from "./AdCard";

const GET_RECENT_ADS = gql`
  query Ads {
    ads {
      id
      title
      price
      picture
    }
  }
`;

export type RecentAd = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

import { useQuery, gql } from "@apollo/client";

export default function RecentAds() {
  const { data, loading } = useQuery<{ ads: RecentAd[] }>(GET_RECENT_ADS);

  if (loading) return "Chargement...";

  const ads = data?.ads || [];

  /*
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    axios
      .get<Ad[]>("http://localhost:4000/ads")
      .then((res) => setAds(res.data))
      .catch(console.error);
  }, []);
  */

  return (
    <div className="pt-6">
      <h2 className="text-2xl mb-6">Annonces récentes</h2>

      <section className="flex flex-wrap pb-24">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </section>
    </div>
  );
}
