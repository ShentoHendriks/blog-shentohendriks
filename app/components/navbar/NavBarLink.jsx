import Link from "next/link";

export default function NavBarLink({ href, children }) {
  return <Link href={`${href}`}>{children}</Link>;
}
