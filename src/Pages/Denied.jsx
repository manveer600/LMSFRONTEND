import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center items-center border-8 h-screen  text-white bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <div className="bg-black text-white px-2 py-1 text-sm rounded rotate-12 absolute">
        Access Denied
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            Go Back
          </span>
        </a>
      </button>
    </div>
  );
}

export default Denied;
