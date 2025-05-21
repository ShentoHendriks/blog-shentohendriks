import getPosts from "@/app/utils/getPosts"; // Ensure this returns { slug: string, content: string (raw MDX), ... }
import { MDXRemote } from "next-mdx-remote/rsc";
// If you use custom components in your MDX, import them:
// import MyCustomH1 from '@/components/MyCustomH1';
// import MyCustomParagraph from '@/components/MyCustomParagraph';

export default async function Page({ params }) {
  const posts = await getPosts(); // Assuming getPosts() returns an array of post objects
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    // Optionally, handle the case where the post is not found.
    // You might want to use `notFound()` from 'next/navigation'
    // import { notFound } from 'next/navigation';
    // return notFound();
    return <div>Post not found.</div>;
  }

  // `post.content` should be the raw MDX string.
  // If you have custom components, define them here or import them.
  // const components = {
  //   h1: MyCustomH1,
  //   p: MyCustomParagraph,
  //   // any other HTML tags or custom components you want to override or provide
  // };

  return (
    <div className="post-formatting pb-40">
      <h1 className="mb-4 font-serif text-4xl font-bold">
        {post.frontmatter.title}
      </h1>
      <p className="mb-4">{post.frontmatter.date}</p>
      <p className="mb-4">
        <strong>Written by: </strong>Shento Hendriks
      </p>
      {/* Render the content of the specific post using MDXRemote */}
      <MDXRemote
        source={post.content}
        // components={components} // Uncomment and pass your custom components if you have any
      />
    </div>
  );
}

export function generateStaticParams() {
  const posts = getPosts();
  // generateStaticParams should return an array of objects,
  // where each object has a key matching your dynamic segment (e.g., 'slug')
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
