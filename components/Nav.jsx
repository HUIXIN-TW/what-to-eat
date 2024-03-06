"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import Logo from "./Logo";
import GitHubButton from "./GitHubButton";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Logo />
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/add-lunch-idea" className="black_btn">
              Add Lunch Idea
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile"
              />
            </Link>
            <GitHubButton />
          </div>
        ) : (
          <div className="flex">
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="black_btn mr-5"
            >
              Sign In
            </button>
            <GitHubButton text="Documentation" />
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/add-lunch-idea"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Add Lunch Idea
                </Link>

                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                    router.push("/");
                  }}
                >
                  Sign Out
                </button>
                <GitHubButton text="Documentation" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="black_btn mr-5"
            >
              Sign In
            </button>
            <GitHubButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
