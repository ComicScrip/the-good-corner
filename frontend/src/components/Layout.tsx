import Head from "next/head";
import Header from "./Header";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="petites annonces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-right" />
      <Header />
      <main className="main-content">{children}</main>
    </>
  );
}
