"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Chat from "@/components/Chat";
import Editor from "@/components/Editor";
import SearchBar from "@/components/Searchbar";
import { MessageCircle, PanelLeftOpen } from "lucide-react";
import Header from "@/components/Header";
import ShowMembers from "@/components/Members";
import LiveCursor from "@/components/LiveCursor";
import NavPanel from "@/components/Navpanel";
import Chatroom from "@/components/Chat";

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const [workspaceName, setWorkspaceName] = useState("");
  const [membersCount, setMembersCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!workspaceId) return;

      try {
        const workspaceRef = doc(db, "workspaces", workspaceId);
        const workspaceSnap = await getDoc(workspaceRef);

        if (workspaceSnap.exists()) {
          setWorkspaceName(workspaceSnap.data().name);

          // Fetch members count correctly
          const membersCollectionRef = collection(
            db,
            "workspaces",
            workspaceId,
            "members"
          );
          const membersSnap = await getDocs(membersCollectionRef);
          setMembersCount(membersSnap.size);
        } else {
          console.error("❌ Workspace not found");
        }
      } catch (error) {
        console.error("❌ Error fetching workspace:", error);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white min-w-[1024px] relative">
      {/* Header */}
      <Header workspaceId={workspaceId} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Toggle Sidebar */}
        <button
          className="absolute top-1 left-4 z-20 p-2 hover:bg-gray-800 rounded"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <PanelLeftOpen
            size={24}
            className="h-7 w-7 text-gray-300 hover:text-white transition-colors"
          />
        </button>

        {/* Left Side - Sidebar */}
        <nav
          className={`transition-all duration-300 ${
            isNavOpen ? "w-[20%]" : "w-0"
          } overflow-hidden bg-gray-900 border-r border-gray-800 flex flex-col h-full`}
        >
          {isNavOpen && (
            <NavPanel workspaceId={workspaceId} openFile={setSelectedFile} />
          )}
        </nav>

        {/* Main - Code Editor */}
        <main className="flex-1 h-full flex flex-col py-2 overflow-auto">
          <div className="flex h-[6%] gap-12 items-center justify-between">
            <h1 className="text-2xl  w-[40%] text-center border-gray-200 font-mono ml-32">
              Your Code Den:{" "}
              <span className="text-indigo-400">{workspaceName}</span>
            </h1>
            <div className="flex items-center gap-4 ">
              <div className="flex items-start bg-blue-800 bg-opacity-40 ring-1 ring-blue-500 px-4 py-1 rounded-md gap-2">
                <SearchBar workspaceId={workspaceId} />
              </div>
              <span className="text-lg text-gray-200 bg-slate-800 px-4 py-2 rounded-full flex items-center justify-center gap-3">
                <ShowMembers workspaceId={workspaceId} />
              </span>
            </div>
          </div>
          <Editor file={selectedFile} />
        </main>
      </div>

      {/* Chat Panel */}
      <aside
        className={`fixed bottom-0 right-0 transition-all duration-300 shadow-lg ${
          isChatOpen ? "h-[82%]" : "h-0"
        } overflow-hidden w-[45%]`}
      >
        {isChatOpen && (
          <Chatroom
            workspaceId={workspaceId}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
          />
        )}
      </aside>

      {/* Chat Button */}
      {!isChatOpen && (
        <button
          className="fixed bottom-6 right-10 z-30 py-3 font-mono px-5 flex items-center gap-2 text-xl bg-teal-700/30 ring-1 ring-teal-500 animate-bounce hover:bg-teal-800 text-white rounded-full shadow-lg"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageCircle className="h-8 w-8" /> AI-Chat
        </button>
      )}
      <LiveCursor workspaceId={workspaceId} />
    </div>
  );
}
