import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <header className="container mx-auto flex justify-between p-4">
      <NavBarLink href="/">Shento's Tech Blog</NavBarLink>
      <nav className="flex gap-4">
        <NavBarLink href="/about">About</NavBarLink>
        <NavBarLink href="/help">Help</NavBarLink>
        <NavBarLink href="/contact">Contact</NavBarLink>
      </nav>
    </header>
  );
}
