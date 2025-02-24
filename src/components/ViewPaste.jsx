import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);
  const paste = allPastes.filter((p)=>p._id===id)[0];
  return (
    <div className="px-30">
      <h1 className="text-center font-bold text-3xl pt-3">View</h1>
    <div className="flex flex-row  gap-5 mt-6">
      <input
        className="rounded-[5px] 
          py-2 pl-4 border border-gray-500 w-full"
        type="text"
        placeholder="enter title here"
        disabled
        value={paste.title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="mt-8 border border-gray-500 rounded-[5px]">
      <textarea
        className="
        min-w-[500px] p-4 w-full"
        value={paste.content}
        disabled
        
        placeholder="enter context here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  </div>
  )
}

export default ViewPaste