"use client";

import Button from "./Button";
import { logoutUser } from "../_lib/actions";
import { AiOutlineLogin } from "react-icons/ai";

function Logout() {
  async function handleClick() {
    logoutUser();
  }
  return (
    <div title="logout">
      <Button variant="danger" onClick={handleClick}>
        <AiOutlineLogin size={16} />
      </Button>
    </div>
  );
}

export default Logout;
