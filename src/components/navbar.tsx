import Link from "next/link";
const Navbar = () => {
  return (
    <nav className=" bg-gray-200 z-50 w-full">
      <div className="flex items-center justify-between p-4 max-w-screen-2xl mx-auto">
        <Link
          href="/gallery"
          className="text-lg font-bold hover:scale-105 transition-all duration-200"
        >
          Gallery
        </Link>
        <div className="flex gap-4">
          {NavItems.map(({ id, label, href }) => (
            <Link
              key={id}
              href={href}
              className="font-medium after:content-[''] hover:text-white p-2 rounded after:h-px hover:after:h-10 after:bg-gray-400 relative after:absolute after:bottom-0 after:left-0 after:w-full  after:transition-all after:duration-300 z-20 after:-z-10 "
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

export const NavItems = [
  { id: 1, label: "Photos", href: "/?type=photos" },
  { id: 2, label: "Videos", href: "/?type=videos" },
];
