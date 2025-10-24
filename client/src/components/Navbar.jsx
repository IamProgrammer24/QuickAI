import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
        className="w-32 sm:w-44 cursor-pointer"
      />
      {user ? (
        <UserButton />
      ) : (
        <button className="flex gap-2 items-center rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        onClick={openSignIn}>
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
