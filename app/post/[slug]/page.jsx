import getPosts from "@/app/utils/getPosts";

export default async function Page({ params }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/app/posts/${slug}.mdx`);
  return <Post />;
}

export function generateStaticParams() {
  const posts = getPosts();
  return posts;
}

export const dynamicParams = false;
