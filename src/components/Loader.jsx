import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white/70 flex items-center justify-center z-[9999]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
