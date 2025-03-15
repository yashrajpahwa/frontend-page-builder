import React from "react";
// import { useRecoilValue } from "recoil";
import { FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
// import { userState } from "../recoil/atoms";

const Home = () => {
  //   const user = useRecoilValue(userState);

  const showToast = () => {
    toast.success("React Toastify is working!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl flex items-center gap-2">
        <FaHome className="text-blue-500" /> Home Page
      </h1>
      <p className="my-4">Welcome to the application!</p>
      <button
        onClick={showToast}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Show Toast
      </button>
    </div>
  );
};

export default Home;
