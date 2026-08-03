import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { stackServerApp } from "@/stack";

export async function Cta() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <section className="py-20 sm:py-24">
      <Reveal className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Start organizing your plant collection today
        </h2>
        <p className="mt-4">
          It only takes a minute to add your first plant and see your
          inventory come together.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
            asChild
          >
            <Link href={user ? "/dashboard" : app.signUp}>
              {user ? "Go to Dashboard" : "Sign Up Free"}
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
