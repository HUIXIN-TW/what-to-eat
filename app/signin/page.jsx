"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const handleLogin = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Implement your login logic here. This could be an API call to your backend.
  // Below is a simplified example using a hypothetical login function.

  try {
    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from redirecting internally
      email,
      password,
    });
    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Successfully logged in");
      router.push("/profile");
    }
  } catch (error) {
    // Handle any exceptions here
    console.error("Failed to log in", error);
  }
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();

    // If the user is already logged in, redirect to their profile page
    if (session?.user) {
      router.push("/profile");
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 text-left bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to your account
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoComplete="email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="w-full py-2 px-4 black_btn">
              Login
            </button>
          </div>
        </form>
        {providers?.google && (
          <button
            type="button"
            className="mt-4 w-full py-2 px-4 outline_btn"
            aria-label="Sign in with Google"
            onClick={() => signIn(providers.google.id)}
          >
            <Image
              src="assets/icons/google.svg"
              width={15}
              height={15}
              alt="google icon"
              className="object-contain"
            />
            <span className="ml-2">Sign in with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
