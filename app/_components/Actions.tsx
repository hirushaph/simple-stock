import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function Actions() {
  return (
    <div>
      <button className="bg-blue-500 rounded-md p-[0.3rem] mr-3 ">
        <FiEdit size={14} color="white" />
      </button>
      <button className="bg-red-500 rounded-md p-[0.3rem]">
        <MdDeleteOutline size={14} color="white" />
      </button>
    </div>
  );
}

export default Actions;
