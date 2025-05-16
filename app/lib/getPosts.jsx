// lib/getPosts.jsx

import fs from "fs";
import path from "path";
import matter from "gray-matter"; // Library to parse frontmatter
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

// Helper function to convert Markdown to HTML
async function markdownToHtml(markdownContent) {
  const result = await unified()
    .use(remarkParse) // Parse the markdown string
    .use(remarkHtml) // Convert the markdown AST to HTML
    .process(markdownContent);
  return result.toString();
}

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "blog/posts");

  let filenames = [];
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Directory not found: \${postsDirectory}`);
      return [];
    }
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error(`Error reading posts directory: \${postsDirectory}`, error);
    return [];
  }

  const mdxFiles = filenames.filter((filename) => filename.endsWith(".mdx"));

  // Since markdownToHtml is async, we need to handle promises, typically with Promise.all
  const postsListPromises = mdxFiles.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    let fileContents;

    try {
      fileContents = fs.readFileSync(filePath, "utf8");
    } catch (error) {
      console.error(`Error reading file: \${filePath}`, error);
      return null;
    }

    const { data, content: mdxContent } = matter(fileContents);
    const slug = filename.replace(/\.mdx\$/, "");

    // Convert the MDX content (which is markdown) to HTML
    let htmlContent = "";
    try {
      htmlContent = await markdownToHtml(mdxContent);
    } catch (conversionError) {
      console.error(
        `Error converting MDX to HTML for \${filename}:`,
        conversionError,
      );
      // Decide how to handle this: return null, or return post without htmlContent, etc.
      // For now, let's keep the post but with empty htmlContent or an error message.
      htmlContent = "<p>Error converting content to HTML.</p>";
    }

    return {
      slug: slug,
      frontmatter: data,
      mdxSource: mdxContent, // The original MDX content (after frontmatter)
      htmlContent: htmlContent, // The converted HTML content
      rawFileContent: fileContents,
    };
  });

  // Wait for all promises to resolve
  let postsList = await Promise.all(postsListPromises);
  postsList = postsList.filter((post) => post !== null); // Filter out any posts that failed to read/process

  // Sort posts by date (optional, same as before)
  postsList.sort((postA, postB) => {
    if (postA.frontmatter.date && postB.frontmatter.date) {
      return (
        new Date(postB.frontmatter.date) - new Date(postA.frontmatter.date)
      );
    }
    return 0;
  });

  return postsList;
}

/*
  How to use this async function in a Next.js App Router Server Component (e.g., app/blog/page.jsx):

  import { getPosts } from '../../lib/getPosts'; // Adjust path
  import Link from 'next/link';

  export default async function BlogPage() { // Note: Page component can be async
    const posts = await getPosts(); // Await the result

    if (!posts.length) {
      return <p>No blog posts found.</p>;
    }

    return (
      <div>
        <h1>Blog</h1>
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <h2>
                <Link href={`/blog/\${post.slug}`}>
                  {post.frontmatter.title || 'Untitled Post'}
                </Link>
              </h2>
              {post.frontmatter.date && <p>Date: {post.frontmatter.date}</p>}
              { // Example: Displaying a snippet of the HTML content (ensure it's safe!) }
              { // For full page display, you'd pass htmlContent to the [slug]/page.jsx }
              { post.htmlContent && (
                  <div dangerouslySetInnerHTML={{ __html: post.htmlContent.substring(0, 200) + '...' }} />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // In your [slug]/page.jsx, you would fetch the specific post and then render its 'htmlContent'
  // using dangerouslySetInnerHTML:
  //
  // async function getPostBySlug(slug) {
  //   const posts = await getPosts();
  //   return posts.find(post => post.slug === slug);
  // }
  //
  // export default async function PostPage({ params }) {
  //   const post = await getPostBySlug(params.slug);
  //
  //   if (!post) {
  //     return <p>Post not found.</p>;
  //   }
  //
  //   return (
  //     <article>
  //       <h1>{post.frontmatter.title}</h1>
  //       <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
  //     </article>
  //   );
  // }
*/
