import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { isEmailValid } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e, data) {
    e.preventDefault();

    if (!userInput.email || !userInput.name || !userInput.message) {
      return toast.error("All fields are mandatory", { id: "contactUs" });
    }

    if (!isEmailValid(userInput.email)) {
      return toast.error("Invalid Email", { id: "invalidEmail" });
    }
    console.log("data is this", data);
    setIsLoading(true);
    const response = await axiosInstance.post("/contact", data);
    setIsLoading(false);
    console.log("response while sending message ", response);
    if (response?.data?.success) {
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
      navigate('/');
      return toast.success(response?.data?.message, { id: "success" });
    }

    // toast.success("Feedback submitted");
  }
  return (
    <HomeLayout>
      <div className="flex flex-col  items-center justify-center p-4 h-[100vh]">
        <form
          noValidate
          onSubmit={(e) => onFormSubmit(e, userInput)}
          className="flex  w-full mt-14 flex-col items-center justify-center gap-2 p-5 rounded-md sm:w-[22rem] text-white sm:shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl underline sm:text-3xl font-semibold font-serif">
            Contact form
          </h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-lg sm:text-xl font-semibold">
              Name
            </label>

            <input
              required
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              type="text"
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-lg sm:text-xl font-semibold">
              email
            </label>
            <input
              required
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              onChange={handleInputChange}
              type="email"
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="message"
              className="text:lg sm:text-xl font-semibold"
            >
              Message
            </label>
            <textarea
              required
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer"
          >
            {isLoading ? <div className="spinner"></div> : "Submit"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
