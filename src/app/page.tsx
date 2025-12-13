import Head from "next/head";
import Header from "@/components/Header";
import { sanityClient } from "../../sanity";

const Home = ({ posts }) => {
  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <div className="flex items-center justify-center border-y border-black bg-yellow-300 py-10 lg:py-0">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">Medium</span> {' '} is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>
        <img 
          className="hidden h-32 md:inline-flex lg:h-full lg:w-80 ml-10"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" 
          alt="Medium Logo" 
        />
      </div>

      <div className="p-10">
        <h1 className="text-3xl">Latest Posts
          </h1>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = async () => {
  try {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    author->{
      name,
      image
    },
    mainImage
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}