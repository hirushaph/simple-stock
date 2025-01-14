import auth from "@/auth";
import Image from "next/image";

async function Header() {
  const user = await auth.getUser();
  return (
    <header className="flex w-full justify-between items-center bg-white px-5 border-b border-b-darkGrey row-span-1 col-span-2">
      <div className="logo">
        <h1 className="text-xl font-semibold text-gray-900">Simple Stock</h1>
      </div>
      <div className="flex justify-end items-center gap-3">
        <span className="text-sm font-light text-gray-600">{user?.name}</span>
        <div>
          <Image
            src="https://avatar.iran.liara.run/public/boy"
            alt="avatar"
            width={44}
            height={44}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
