import {
  useLogoutMutation,
  useProfileQuery,
  useSearchAdsQuery,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import AdCard from "./AdCard";
import uploadImage from "@/uploadImage";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [imagePreviewURL, setImagePreviewURL] = useState("");
  const [error, setError] = useState("");
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "all",
    onError: () => {
      router.push("/login");
    },
  });

  const { data: currentUserAds } = useSearchAdsQuery({
    variables: { ownerId: currentUser?.profile.id },
    skip: !currentUser?.profile,
    fetchPolicy: "cache-and-network",
  });

  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (currentUser?.profile.avatar)
      setImagePreviewURL(currentUser?.profile.avatar);
  }, [currentUser?.profile.avatar]);

  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    setError("");
    try {
      await updateProfile({ variables: { data: { ...formJSON } } });
      toast.success("Profil mis à jour");
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      client.resetStore();
    }
  };

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  if (!currentUser?.profile) return null;

  return (
    <>
      <p className="pt-6">
        Vous etes connecté avec le compte {currentUser.profile.nickname}
      </p>

      <button
        className="btn btn-error text-white mt-4 w-full"
        onClick={handleLogout}
      >
        Se Déconnecter
      </button>

      <form className="pt-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6">Mon Profil</h2>

        {imagePreviewURL && (
          <img
            className="h-40 w-40 rounded-full"
            src={imagePreviewURL}
            alt="picture"
          />
        )}

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="avatar">
            <span className="label-text">Avatar</span>
          </label>
          <input
            type="url"
            name="avatar"
            id="avatar"
            required
            onChange={(e) => setImagePreviewURL(e.target.value)}
            value={imagePreviewURL}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <input
          accept="image/*"
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const res = await uploadImage(file);
              if (res) setImagePreviewURL(res.data.url);
            }
          }}
        />

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={currentUser?.profile.email}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="password">
            <span className="label-text">Nouveau mot de passe</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Laisser vide pour ne pas modifier"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="nickname">
            <span className="label-text">Pseudo</span>
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            defaultValue={currentUser?.profile.nickname}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary text-white mt-12 w-full"
        >
          Enregistrer
        </button>
      </form>

      <h2 className="text-2xl mb-6 mt-10">Mes annonces</h2>

      <Link href="/newAd" className="button link-button mb-6">
        <span className="mobile-short-label">Publier</span>
        <span className="desktop-long-label">Publier une annonce</span>
      </Link>

      <section className="flex flex-wrap pb-24">
        {currentUserAds?.ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </section>
    </>
  );
}
