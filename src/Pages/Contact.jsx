import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { isEmailValid } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
function Contact(){
    const navigate = useNavigate();
    const [userInput , setUserInput] = useState({
        name:"",
        email:'',
        message:""
    })

    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        
        if(!userInput.email || !userInput.name || !userInput.message ){
            return toast.error("All fields are mandatory");
            
        }
        
        if(!isEmailValid(userInput.email)){
            toast.error("Invalid Email");
            return;
        }
        
        toast.success('Feedback submitted');

        
    }
    return(
        <HomeLayout>
            <div className="flex flex-col  items-center justify-center sm:h-[100vh]">
            <form noValidate onSubmit={onFormSubmit} className="flex mt-14 flex-col items-center justify-center gap-2 p-5 rounded-md text-white sm:w-[22rem] shadow-[0_0_10px_black]">
                <h1 className="text-3xl font-semibold font-serif">Contact form</h1>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xl font-semibold">Name</label>

                    <input required className="bg-transparent border px-2 py-1 rounded-sm" id="name" name="name" placeholder="Enter your name" onChange={handleInputChange} type="text" value={userInput.name} />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xl font-semibold">email</label>
                    <input required className="bg-transparent border px-2 py-1 rounded-sm" id="email" name="email" placeholder="abc@gmail.com" onChange={handleInputChange} type="email" value={userInput.email} />
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-xl font-semibold">Message</label>
                    <textarea required className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" id="message" name="message" placeholder="Enter your message" onChange={handleInputChange}  value={userInput.message}/>
                </div>

                <button type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    >
                        Submit
                    </button>
            </form>
            
            <button onClick={()=> navigate(-1)} className="mb-8 hover:text-red-700 mt-2 px-8 py-3 bg-[#1A2238] border font-medium text-[#FF6A3D]">
            Go Back
      </button>
            </div>
        </HomeLayout>
    )
}

export default Contact;