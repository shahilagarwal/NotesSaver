import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import DateFormatter from './DateFormatter'
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div className="px-30 mt-15">
      <input
      className="rounded-[5px] 
          py-2 pl-4 border border-gray-500 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search pastes..."
      />
      <div className=" border border-gray-500 mt-5 rounded-[10px]">
        <div className="font-bold text-3xl border-b border-gray-500 p-2">All Pastes</div>
        <div className="">
          <div className="flex flex-col gap-5 m-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div className="border flex flex-row place-content-between rounded-[7px] p-2" key={paste?._id}>
              <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">{paste.title}</div>
              <div>
                {paste.content.length > 100 ? (
                  <>
                    {paste.content.slice(0, 100)}...{" "}
                    <Link to={`/pastes/${paste._id}`} className="text-blue-500">
                      Read More
                    </Link>
                  </>
                ) : (
                  paste.content
                )}
              </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                <button className="border border-gray-500 rounded-[2px] p-0.5">
                  <a href={`/?pasteId=${paste?._id}`}>
                  <CiEdit size={25}/>
                  </a>
                </button>
                <button className="border border-gray-500 rounded-[2px] px-1">
                  <a href={`/pastes/${paste?._id}`}><GrView size={23}/></a>
                </button>
                <button className="border border-gray-500 rounded-[2px] px-1" onClick={() => handleDelete(paste?._id)}><RiDeleteBin6Line size={20} /></button>
                <button className="border border-gray-500 rounded-[2px] px-1"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}
                >
                  <MdOutlineContentCopy size={20} />
                </button>
                <button className="border border-gray-500 rounded-[2px] px-1"><IoMdShare size={20} /></button>
                </div>
                <div className="flex flex-row "><MdOutlineDateRange size={20}/>{paste.createdAt ? <DateFormatter isoDate={paste.createdAt} />: "No Date Available"}</div>
              </div>
              
            </div>
          ))}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Paste;
