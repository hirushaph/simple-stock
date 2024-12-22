import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-between items-center h-[80px] bg-white px-5 border-b border-b-darkGrey">
      <div className="logo">
        <h1 className="text-xl font-semibold">Simple Stock</h1>
      </div>
      <div className="flex justify-end items-center gap-2">
        <span className="text-sm font-light text-gray-600">username</span>
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
