import Head from "next/head";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
    </div>
  );
}

export default Home;