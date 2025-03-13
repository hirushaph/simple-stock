"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Available", link: "/available" },
  { name: "Borrowed", link: "/borrowed" },
  { name: "History", link: "/history" },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Users",
    link: "/users",
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white pt-4 w-60">
      <ul>
        {menu.map((item) => (
          <li key={item.name} className="relative">
            <Link
              href={item.link}
              className={`flex gap-3 py-3 px-4 items-center transition-colors ${
                pathname === item.link
                  ? "bg-accentLight"
                  : "hover:bg-accentLight"
              }`}
            >
              <span className="text-[18px] font-normal">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
