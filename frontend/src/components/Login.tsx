import {
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Profile from "./Profile";

export default function Login() {
  const [error, setError] = useState("");

  const [login] = useLoginMutation();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const { redirectURLAfterLogin } = router.query;
  const isLoggedIn = !!currentUser?.profile;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    setError("");
    try {
      await login({ variables: { data: { ...formJSON } } });
      if (redirectURLAfterLogin) router.push(redirectURLAfterLogin as string);
    } catch (err) {
      setError("Identifiants incorrects");
    } finally {
      client.resetStore();
    }
  };

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  return isLoggedIn ? (
    <Profile />
  ) : (
    <>
      <form className="pt-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6">Se connecter</h2>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            data-testid="login-email"
            type="email"
            name="email"
            id="email"
            required
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            data-testid="login-password"
            type="password"
            name="password"
            id="password"
            required
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button className="btn btn-primary text-white mt-12 w-full">
          Se Connecter
        </button>
      </form>
      <div className="pt-16">
        <h2 className="text-2xl">Pas encore de compte ?</h2>

        <Link href="/signup">
          <button className="btn btn-info text-white mt-12 w-full">
            S'inscrire
          </button>
        </Link>
      </div>
    </>
  );
}
