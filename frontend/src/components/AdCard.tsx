import Link from "next/link";
import { RecentAd } from "./RecentAds";

type AdCardProps = {
  ad: RecentAd;
  link: string;
};
export default function AdCard({
  ad: { price, title, picture },
  link,
}: AdCardProps) {
  return (
    <div className="w-[400px]">
      <Link href={link}>
        <div className="shadow-md border rounded-lg  p-6 bg-white mr-3 mb-3">
          <img
            className="h-[200px] w-full object-cover rounded-md"
            src={picture}
          />
          <div className="flex justify-between pt-6">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price} €</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
