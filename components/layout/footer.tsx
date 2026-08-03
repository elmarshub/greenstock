import Link from "next/link";
import { GithubIcon, TwitterIcon } from "lucide-react";
import { PLANT_CATEGORIES } from "@/lib/validations/plant";
import { categorySlugs } from "@/lib/plant-images";

const company = [
  { label: "About", href: "/about" },
  { label: "Plants", href: "/plants" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark text-brand-dark-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-lime text-brand-lime-foreground">
                🪴
              </span>
              GreenStock
            </Link>
            <p className="mt-4 max-w-xs text-sm text-brand-dark-muted">
              Organize and track your plant collection with ease inventory,
              categories, and stock levels in one place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark-muted">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-dark-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Categories</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-dark-muted">
              {PLANT_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category}>
                  <Link
                    href={`/plants#${categorySlugs[category]}`}
                    className="hover:text-brand-dark-foreground"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Get in touch</p>
            <div className="mt-4 flex items-center gap-4 text-brand-dark-muted">
              <Link href="#" target="_blank" className="hover:text-brand-dark-foreground">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank" className="hover:text-brand-dark-foreground">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-brand-dark-muted">
          &copy; {new Date().getFullYear()} GreenStock. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
