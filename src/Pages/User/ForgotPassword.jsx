import HomeLayout from "../../Layouts/HomeLayout";

function ForgotPassword() {
    function forgotPasswordLogic(e){
        e.preventDefault();
        console.log('clicked');
    }
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[90vh]">
        <form
        onSubmit={forgotPasswordLogic}
          noValidate
          className=" border flex flex-col  justify-center gap-3 space-y-2 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-serif underline text-2xl font-bold ">
            Forgot Password Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold w-full font-serif">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              className="px-2 py-1 bg-transparent border"
            />
          </div>


          <div className="space-y-1 font-serif">
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
