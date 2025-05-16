import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home() {
  const files = fs.readdirSync(path.join("app/posts"));
  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    return slug;
  });
  console.log(posts);
  return (
    <div className="container mx-auto flex gap-4 px-4">
      <section>
        <h1 className="mb-4 text-4xl font-bold">Shento's blog</h1>
        <p>
          Hey there, and welcome to my blog! You'll find a bunch of tutorials on
          this blog, all designed with clarity and approachability in mind. I
          try to break down complex topics into bite-sized, understandable
          pieces, using plain language and practical examples.
        </p>
      </section>
    </div>
  );
}
