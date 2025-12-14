'use client'

import { sanityClient, urlFor } from "../../../../sanity";
import Header from "@/components/Header";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler, UseFormProps } from "react-hook-form";
import { useState, useEffect } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const Posts = ({ params }: Props) => {
  const [slug, setSlug] = useState<string>('');
  const [post, setPost] = useState<any>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  }

  // Extract the slug from params using useEffect
  useEffect(() => {
    params.then(({ slug: paramSlug }) => {
      setSlug(paramSlug);
    });
  }, [params]);

  // Fetch post data when slug changes
  useEffect(() => {
    if (slug) {
      fetchPosts();
    }
  }, [slug]);
  
  async function fetchPosts() {
    try {
      const query = `*[_type=="post" && slug.current == "${slug}"][0]{
        _id,
        _createdAt,
        title,
        slug,
        body,
        author->{
          name,
          image
        },
        mainImage
      }`;
      const fetchedPost = await sanityClient.fetch(query);
      setPost(fetchedPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPost(null);
    }
  }

  return (
    <main>
      <Header />

      {post ? (
        <article>
          <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()} alt={post.title} />
          <div className="max-w-3xl mx-auto p-5">
            <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
            {/* <h2 className="mb-2 text-xl font-light text-gray-500">by {post.author.name}</h2> */}
            <div className="flex items-center space-x-2">
              <img src={urlFor(post.author.image).url()} alt={post.author.name} className="h-10 w-10 rounded-full" />
              <p className="text-sm font-extralight">
                Blog post by <span className="text-green-600">{post.author.name}</span> - Published at {" "}
                {new Date(post._createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-10">
              {/* Only render PortableText if body content exists */}
              {post.body && post.body.length > 0 ? (
                <PortableText
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                  content={post.body}
                  serializers={{
                    h1: (props: any) => (<h1 className="my-5 text-2xl font-bold" {...props} />),
                    h2: (props: any) => <h2 className="my-5 text-xl font-bold my-5" {...props} />,
                    p: (props: any) => <p className="my-5" {...props} />,
                    li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
                    link: ({ href, children }: any) => <a href={href} className="text-blue-500 hover:underline">{children}</a>,
                  }}
                />
              ) : (
                <div className="my-5 text-gray-500">
                  <p>No content available for this post yet.</p>
                  <p className="mt-2 text-sm">Post slug: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{slug}</span></p>
                </div>
              )}
            </div>
          </div>
          <hr className="mx-auto max-w-lg my-5 border border-yellow-500" />
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex flex-col max-w-3xl p-5 mb-10">
            <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="my-4" />

            <input type="hidden" {...register("_id")} name="_id" value={post._id} />
            <label className="block mb-5">
              <span className="text-gray-700">Name</span>
              <input type="text" {...register("name", { required: true })} className="shadow border border-gray-300 rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none" placeholder="Your name" />
            </label>

            <label className="block mb-5">
              <span className="text-gray-700">Email</span>
              <input type="text" {...register("email", { required: true })} className="shadow border border-gray-300 rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none" placeholder="Your email" />
            </label>

            <label className="block mb-5">
              <span className="text-gray-700">Comment</span>
              <textarea rows={8} {...register("comment", { required: true })} className="shadow border border-gray-300 rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none" placeholder="Your comment" />
            </label>

            <div className="flex flex-col p-5">
              {
                errors.name && (<span className="text-red-500">- Name is required</span>)
              }
              {errors.email && (<span className="text-red-500">- Email is required</span>)}
              {errors.comment && (<span className="text-red-500">- Comment is required</span>)
              }
            </div>

            <input type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-sm cursor-pointer transition-colors focus:shadow-outline focus:outline-none" value="Submit" />
          </form>
        </article>

      ) : (
          <p className="text-gray-500">No posts available.</p>
      )}
    </main>
  );
}

export default Posts