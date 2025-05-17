import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function getPosts() {
  const files = fs.readdirSync(path.join("app/posts"));
  const posts = files.map((filename) => {
    const contentWithMarkdown = fs.readFileSync(
      path.join("app/posts", filename),
      "utf-8",
    );
    const { data, content } = matter(contentWithMarkdown);
    const slug = filename.replace(".mdx", "");
    return { slug: slug, frontmatter: data, content };
  });
  return posts;
}
