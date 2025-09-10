import React, { useState, useEffect, useRef } from "react";
import { Camera, Edit, Save, RefreshCw, X } from "lucide-react";

const defaultProfile = {
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  about: "",
  profileImage: "",
};

const UserProfileModal = ({ open, onClose }) => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultProfile);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
      const savedData = localStorage.getItem("userProfile");
      if (savedData) {
        try {
          setProfileData(JSON.parse(savedData));
        } catch (e) {
          setProfileData(defaultProfile);
        }
      } else {
        setProfileData(defaultProfile);
      }
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";
    }
    // Cleanup in case modal is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!profileData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!profileData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!["male", "female"].includes(profileData.gender))
      newErrors.gender = "Gender is required";
    if (!/^\+?\d{7,15}$/.test(profileData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(profileData.email))
      newErrors.email = "Enter a valid email";
    if (!profileData.address.trim()) newErrors.address = "Address is required";
    if (!profileData.about.trim()) newErrors.about = "About is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    if (!validate()) return;
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setIsEditing(false);
  };
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all your profile information? This action cannot be undone."
      )
    ) {
      setProfileData(defaultProfile);
      localStorage.removeItem("userProfile");
      setIsEditing(false);
    }
  };

  if (!open) return null;

  // Handler for clicking the overlay (not the modal)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-red-200/60"
      onClick={handleOverlayClick}
      style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
    >
      <div
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden cursor-pointer hover:scale-105 transition"
              onClick={() => isEditing && fileInputRef.current?.click()}
            >
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-500" />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              placeholder="First Name"
              value={profileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              disabled={!isEditing}
              className={`p-2 border rounded ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.firstName}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Last Name"
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              disabled={!isEditing}
              className={`p-2 border rounded ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <select
            value={profileData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            disabled={!isEditing}
            className={`p-2 border rounded w-full ${
              errors.gender ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-xs mt-1">{errors.gender}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <input
            type="tel"
            placeholder="Phone Number"
            value={profileData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            disabled={!isEditing}
            className={`p-2 border rounded w-full ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-xs mt-1">
              {errors.phoneNumber}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!isEditing}
            className={`p-2 border rounded w-full ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <textarea
            placeholder="Address"
            value={profileData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            disabled={!isEditing}
            className={`p-2 border rounded w-full min-h-[60px] ${
              errors.address ? "border-red-500" : ""
            }`}
          />
          {errors.address && (
            <span className="text-red-500 text-xs mt-1">{errors.address}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <textarea
            placeholder="About"
            value={profileData.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            disabled={!isEditing}
            className={`p-2 border rounded w-full min-h-[80px] ${
              errors.about ? "border-red-500" : ""
            }`}
          />
          {errors.about && (
            <span className="text-red-500 text-xs mt-1">{errors.about}</span>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex-1 bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
