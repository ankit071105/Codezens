"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import InviteNotification from "./InviteNotification";
import { auth } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase"; // Firestore instance
import { LayoutDashboard } from "lucide-react";

const Header = ({ workspaceId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!workspaceId) return;
    const fetchWorkspaceDetails = async () => {
      const workspaceRef = doc(db, "workspaces", workspaceId);
      const workspaceSnap = await getDoc(workspaceRef);
      if (workspaceSnap.exists()) {
        setIsPublic(workspaceSnap.data().isPublic ?? true);
      }
    };
    fetchWorkspaceDetails();
  }, [workspaceId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().displayName || user.email);
        } else {
          setUserName(user.displayName);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#251627] via-[#7A3B2E] to-[#C98A52] border-b border-[#5e3c2f] shadow-2xl backdrop-blur-xl z-20">
      {/* Futuristic AI-Inspired Glowing Logo */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7134] to-[#DA4DFF] drop-shadow-[0_0_20px_rgba(255,113,52,0.8)] transition-all duration-500 ease-in-out hover:drop-shadow-[0_0_30px_rgba(218,77,255,1)] animate-pulse">
        CodeZen
      </h1>

      <InviteNotification />

      <div className="flex items-center gap-6">
        {pathname.startsWith("/workspace/") && (
          <Button
            onClick={goToDashboard}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-cyan-500/50"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
        )}

        {/* Welcome Message */}
        <p className="text-gray-300 text-sm font-medium animate-fadeIn">
          Welcome back,{" "}
          <span className="font-bold text-cyan-400">{userName}</span> 👋
        </p>

        {/* Profile Avatar with Glow */}
        <Link href="/profile">
          <Avatar className="w-12 h-12 cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-cyan-400 hover:scale-110 hover:shadow-[0_0_10px_rgba(95,208,250,0.7)]">
            <AvatarImage
              src={auth.currentUser?.photoURL || "/robotic.png"}
              alt="Profile"
            />
            <AvatarFallback className="text-cyan-300">U</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
