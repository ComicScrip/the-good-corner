import {
  useLoginMutation,
  useProfileQuery,
  useRegisterMutation,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [error, setError] = useState("");
  const [register] = useRegisterMutation();
  const router = useRouter();

  const [login] = useLoginMutation();
  const { client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    setError("");
    try {
      await register({ variables: { data: { ...formJSON } } });
      await login({
        variables: {
          data: { email: formJSON.email, password: formJSON.password },
        },
      });
      router.push("/me");
    } catch (err) {
      setError("could not create account");
    } finally {
      client.resetStore();
    }
  };

  return (
    <form className="pt-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-6">Inscription</h2>

      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="nick">
          <span className="label-text">Pseudo</span>
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          required
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button className="btn btn-primary text-white mt-12 w-full">
        Creer mon compte
      </button>
    </form>
  );
}
