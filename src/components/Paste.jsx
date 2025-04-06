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
import DateFormatter from "./DateFormatter";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="px-4 md:px-10 w-full max-w-screen-lg mx-auto mt-10">
      <input
        className="rounded-md py-2 pl-4 border border-gray-500 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search pastes..."
      />

      <div className="border border-gray-500 mt-5 rounded-md">
        <div className="font-bold text-2xl md:text-3xl border-b border-gray-500 p-3">
          All Pastes
        </div>
        <div className="flex flex-col gap-4 p-4">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                className="border flex flex-col md:flex-row md:justify-between gap-4 rounded-md p-4"
                key={paste?._id}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-xl md:text-2xl">
                    {paste.title}
                  </div>
                  <div className="text-sm md:text-base">
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

                <div className="flex flex-col gap-2 md:items-end">
                  <div className="flex flex-wrap gap-2">
                    <a href={`/?pasteId=${paste._id}`}
                      className="border border-gray-500 rounded px-2 py-1 text-sm"
                    >
                      <CiEdit size={20} />
                    </a>
                    <a href={`/pastes/${paste._id}`}
                      className="border border-gray-500 rounded px-2 py-1 text-sm"
                    >
                      <GrView size={20} />
                    </a>
                    <button
                      className="border border-gray-500 rounded px-2 py-1 text-sm"
                      onClick={() => handleDelete(paste._id)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                    <button
                      className="border border-gray-500 rounded px-2 py-1 text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <MdOutlineContentCopy size={20} />
                    </button>
                    <button className="border border-gray-500 rounded px-2 py-1 text-sm"
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                        navigator.clipboard.writeText(shareUrl);
                        toast.success("Shareable link copied to clipboard");
                      }}
                    >
                      <IoMdShare size={20} />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdOutlineDateRange size={18} className="mr-1" />
                    {paste.createdAt ? (
                      <DateFormatter isoDate={paste.createdAt} />
                    ) : (
                      "No Date Available"
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No pastes found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
