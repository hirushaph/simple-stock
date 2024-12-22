import Link from "next/link";

const menu = [
  {
    name: "Dashboard",
    icon: "/dashboard.png",
    link: "/dashboard",
  },

  {
    name: "Available",
    icon: "/available.png",
    link: "/available",
  },

  {
    name: "Borrowed",
    icon: "/borrowed.png",
    link: "/borrowed",
  },

  {
    name: "History",
    icon: "/history.png",
    link: "/history",
  },
];

function Sidebar() {
  return (
    <aside className="bg-white pt-4">
      <ul>
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className="flex gap-3 py-3 px-4 duration-400 hover:bg-accentLight items-center transition-colors "
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
