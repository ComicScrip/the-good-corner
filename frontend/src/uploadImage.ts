import axios from "axios";

export default async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  return axios
    .post<{ url: string }>(
      process.env.NEXT_PUBLIC_UPLOAD_API_ENDPOINT as string,
      form
    )
    .catch(console.error);
}
