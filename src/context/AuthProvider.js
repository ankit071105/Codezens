"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/config/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("AuthProvider mounted. Listening for auth state changes...");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
        setUser(user);

        // Redirect logged-in users to dashboard if on login/register/home
        if (pathname === "/login" || pathname === "/" || pathname === "/register") {
          router.push("/dashboard");
        }
      } else {
        console.log("No user logged in.");
        setUser(null);

        // Redirect guests away from protected routes
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/workspace")) {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
