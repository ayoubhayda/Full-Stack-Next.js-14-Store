import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen md:py-8 flex justify-center items-center">
      <SignIn />
    </section>
  );
}
