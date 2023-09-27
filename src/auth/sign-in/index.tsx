import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <section className="">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-md mx-auto">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </div>
      </div>
    </section>
  );
}
