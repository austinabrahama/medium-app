import Head from "next/head";
import Header from "@/components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Link from 'next/link'

const Home = async () => {
  // Fetch posts directly in the component (App Router way)
  const posts = await fetchPosts();

  async function fetchPosts() {
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
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

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

      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <Link href={`/post/${post.slug.current}`} key={post._id}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border">
                <img src={urlFor(post.mainImage).url()} alt={post.title} />
                <div className="flex justify-between bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-sm">by {post.author.name}</p>
                  </div>
                  <img src={urlFor(post.author.image).url()} alt={post.author.name} className="h-12 w-12 rounded-full" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;