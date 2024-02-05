import axios from "axios";

export default async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  return axios
    .post<{ url: string }>("http://localhost:8000/uploads", form)
    .catch(console.error);
}
