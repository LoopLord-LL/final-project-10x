function NavLinks({ mobile = false }) {
  return (
    <ul
      className={
        (mobile ? "flex flex-col gap-4" : "flex gap-6") +
        " text-gray-700 font-medium"
      }
    >
      <li className="cursor-pointer hover:text-blue-600">About Us</li>
      <li className="cursor-pointer hover:text-blue-600">Contact</li>
      <li className="cursor-pointer hover:text-blue-600">Products</li>
    </ul>
  );
}
export default NavLinks;
