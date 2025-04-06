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
  const allPastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchparams({});
  }

  function handlePlus() {
    setTitle("");
    setValue("");
    navigate("/");
  }

  return (
    <div className="px-4 md:px-10">
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">
        <input
          className="rounded-md py-2 pl-4 border border-gray-500 w-full md:flex-1"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2 w-full md:w-auto">
          <button
            className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-white w-full md:w-auto"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white flex items-center justify-center"
            onClick={handlePlus}
          >
            <IoIosAddCircleOutline size={20} />
          </button>
        </div>
      </div>

      <div className="mt-8 border border-gray-500 rounded-md overflow-hidden">
        <div className="flex space-x-2 border-b border-gray-400 p-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <textarea
          className="w-full p-4 min-h-[300px] resize-y bg-transparent"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
