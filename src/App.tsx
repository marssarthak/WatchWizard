import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey}  navigate={(to) => navigate(to)}>
      <Outlet />
    </ClerkProvider>
  );
}


export default App;