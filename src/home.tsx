import {
  UserButton,
  useUser,
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/clerk-react";

type Props = {};

export default function Home({}: Props) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  console.log(user);
  return (
    <>
      <div>
        <div>Hello, {user?.firstName} welcome to Clerk</div>
        <UserButton />

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">
              Sign in
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
              <span>Sign up</span>
              <svg
                className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </>
  );
}
