import Link from "next/link";
import getPosts from "./utils/getPosts";

const posts = getPosts();

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4">
      <section>
        <h1 className="mb-4 text-4xl font-bold">Shento's blog</h1>
        <p>
          Hey there, and welcome to my blog! You'll find a bunch of tutorials on
          this blog, all designed with clarity and approachability in mind. I
          try to break down complex topics into bite-sized, understandable
          pieces, using plain language and practical examples.
        </p>
      </section>
      <div className="flex flex-col">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="mb-4 rounded-md border border-gray-200 p-8"
          >
            <p className="mb-4 text-xl">{post.frontmatter.title}</p>
            <p className="mb-4 text-gray-500">{post.frontmatter.summary}</p>
            <Link
              className="mt-8 flex w-fit rounded-md bg-gray-200 px-4 py-2 duration-75 hover:bg-gray-400"
              href={`/post/${post.slug}`}
            >
              Read article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
