import Layout from "@/components/Layout";
import { Category } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

export default function NewAd() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  console.log({ categories });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("envoi des données");
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.price = parseFloat(formJSON.price);
    axios
      .post("http://localhost:4000/ads", formJSON)
      .then(() => {
        alert("merci !");
      })
      .catch(console.error);
  };

  return (
    <Layout title="Creation d'une annonce">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Titre :
          <input type="text" name="title" id="name" required />
        </label>

        <br />
        <br />

        <label htmlFor="picture">Image : </label>
        <input type="text" name="picture" id="picture" required />

        <br />
        <br />

        <label htmlFor="location">Localisation : </label>
        <input type="text" name="location" id="location" required />

        <br />
        <br />

        <label htmlFor="owner">Auteur : </label>
        <input type="text" name="owner" id="owner" required />

        <br />
        <br />

        <label htmlFor="description">Description : </label>
        <textarea name="description" id="description" required></textarea>

        <br />
        <br />

        <label htmlFor="price">Prix : </label>
        <input type="number" name="price" id="price" min={0} required />

        <br />
        <br />

        <label htmlFor="category">Categorie : </label>
        <select id="category" name="category" required>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button>Envoyer</button>
      </form>
    </Layout>
  );
}
