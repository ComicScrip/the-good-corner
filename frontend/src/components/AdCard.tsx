import { Ad } from "@/types";
import Link from "next/link";

type AdCardProps = {
  ad: Ad;
  link: string;
  onAddPrice?: (price: number) => void;
};
export default function AdCard({
  ad: { price, title, picture },
  link,
  onAddPrice,
}: AdCardProps) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" href={link}>
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
      {typeof onAddPrice === "function" && (
        <button className="button" onClick={() => onAddPrice(price)}>
          Add price to total
        </button>
      )}
    </div>
  );
}
