import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Form */}
          <div className="max-w-md mx-auto">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
          </div>
        </div>
      </div>
    </section>
  );
}
