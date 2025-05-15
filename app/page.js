import Image from "next/image";

export default function Home() {
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
