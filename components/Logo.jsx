"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <div className="sm:flex hidden">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/lunch-box-blue-yellow.webp"
            alt="what-to-eat-logo"
            width={100}
            height={100}
            className="object-contain rounded-full"
          />
          <h1 className="m-2 head_text lime_gradient">What To Eat</h1>
        </Link>
      </div>
      <div className="sm:hidden flex relative">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/lunch-box-blue-yellow.webp"
            alt="what-to-eat-logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
