import ArticleCard from "components/ArticleCard";
import { Table } from "components/Table";
import Head from "next/head";
import styles from "styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Home</main>
      <ArticleCard />
    </div>
  );
}
