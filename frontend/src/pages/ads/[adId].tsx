import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function AdDetails() {
  const router = useRouter();
  const { adId } = router.query;

  return (
    <Layout title={`annonce ${adId}`}>
      <h1>Détails de l'annonce {adId}</h1>
    </Layout>
  );
}
