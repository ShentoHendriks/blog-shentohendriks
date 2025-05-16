export default async function Page({ params }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/app/posts/${slug}.mdx`);
  return <Post />;
}

export function generateStaticParams() {
  return [{ slug: "mdx-page" }];
}

export const dynamicParams = false;
