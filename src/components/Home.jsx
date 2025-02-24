import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchparams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes);
  const navigate = useNavigate();
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //after creation or updation
    setTitle("");
    setValue("");
    setSearchparams({});
  }
  function handlePlus(){
    setTitle("");
    setValue("");
    navigate("/")
  }
  return (
    <div className="px-30">
      <div className="flex flex-row  gap-5 mt-8">
        <input
          className="rounded-[5px] 
          py-2 pl-4 border border-gray-500 w-full"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="rounded-[10px]  bg-blue-600 px-4 min-w-[150px] text-white" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
        <button className="px-5 rounded-[10px] bg-blue-600 text-white" onClick={handlePlus}>
        <IoIosAddCircleOutline size={20} />
        </button>
      </div>
      <div className="mt-8 border border-gray-500 rounded-[5px]">
      <div className="flex space-x-2 border-b border-gray-400 p-2">
        <div className="w-4 h-4 bg-red-500 rounded-full "></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full  delay-200"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full  delay-400"></div>
        </div>
        <textarea
          className="
        min-w-[500px] p-4 w-full"
          value={value}
          placeholder="enter context here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
