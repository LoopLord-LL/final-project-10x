import React, { useState } from "react";
import { User } from "lucide-react";
import UserProfileModal from "./UserProfileModal";

const UserProfileIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition"
        onClick={() => setOpen(true)}
        aria-label="View Profile"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>
      {open && <UserProfileModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default UserProfileIcon;
