"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Sparkles, Code, MessageSquare } from "lucide-react";

export default function HomePage() {
  const features = [
    { icon: <Users />, title: "Team Collaboration", description: "Work together seamlessly with synchronized coding and real-time updates.", color: "bg-blue-500" },
    { icon: <Sparkles />, title: "AI Assistance", description: "Leverage AI-powered code suggestions and auto-completion.", color: "bg-green-500" },
    { icon: <Code />, title: "Smart Debugging", description: "Find and fix issues with an intelligent debugging assistant.", color: "bg-purple-500" },
    { icon: <MessageSquare />, title: "Integrated Chat", description: "Discuss code changes and get instant feedback in real-time.", color: "bg-yellow-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6">
        <motion.h1
          className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Next-Gen Code Editor
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400 mt-4 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Experience seamless coding, collaboration, and AI-powered development in one powerful editor.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 transition-transform">
            Get Started - Free
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <Card className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:shadow-lg transition-all">
      <CardContent className="text-center flex flex-col items-center">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full ${color} mb-4 text-white text-3xl`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}
