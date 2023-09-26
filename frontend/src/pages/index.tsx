import RecentAds from "@/components/RecentAds";
import Layout from "@/components/Layout";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <Layout title="Accueil - TGC">
      <Counter />
      <RecentAds />
    </Layout>
  );
}
