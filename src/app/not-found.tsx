import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-midnight px-5 pt-20">
      <div className="text-center">
        <p className="font-script text-7xl text-gold">404</p>
        <h1 className="mt-4 font-serif text-3xl font-medium text-ivory">
          This page has slipped away.
        </h1>
        <p className="mt-4 font-sans text-base font-light text-ivory/60">
          The page you are looking for could not be found.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Return Home</Button>
        </div>
      </div>
    </section>
  );
}
