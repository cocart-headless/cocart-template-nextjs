import Link from "next/link";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/posts", label: "Blog" },
];

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
