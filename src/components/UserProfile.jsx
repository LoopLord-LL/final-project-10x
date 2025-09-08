import UserProf from "../assets/user.png"; 
function UserProfile() {
  return (
    <div className="cursor-pointer flex items-center gap-2">
      <img
        src={UserProf}
        alt="User"
        className="w-8 h-8 text-gray-600"
      />
    </div>
  );
}
export default UserProfile;
