import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorPayKey,
  subscribeBundle,
  verifyUserPayment,
} from "../../Redux/Slices/Razorpay";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout.jsx";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function verifySubscription(e) {
    e.preventDefault();
    console.log("subscribed", subscribed);
    console.log("razorpay key", razorpayKey);
    console.log("subscription_id", subscription_id);
    if (!subscribed || !razorpayKey || !subscription_id) {
      return toast.error("Please Subscribe the course before buying it.", {
        id: "subscribeCourse",
        icon: "😣",
        duration: 2000,
      });
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Code Karo Pvt. Ltd",
      description: "Subscription",
      theme: {
        color: "#028195",
      },
      handler: async function (response) {
        try {
          paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
          paymentDetails.razorpay_signature = response.razorpay_signature;
          paymentDetails.razorpay_subscription_id =
            response.razorpay_subscription_id;

          const res = await dispatch(verifyUserPayment(paymentDetails));

          if (res?.payload?.success) {
            navigate("/checkout/success");
            return toast.success(res?.payload?.message, {
              id: "paymentSuccess",
            });
          } else {
            navigate("/checkout/fail");
            return toast.error(err.message, {
              id: "PaymentFail",
            });
          }
        } catch (error) {
          console.log("error sending verification request to backend", error);
          return toast.error(error?.message);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    (async function load() {
      try {
        const response = await dispatch(getRazorPayKey());
        if (response?.payload?.success) {
          const response1 = await dispatch(subscribeBundle());
          if (response1?.payload?.success) {
            setSubscribed(true);
          }
        }
      } catch (error) {
        console.log(
          "error while fetching razorpay key and subscribing to the course",
          error
        );
        return toast.error(error?.message);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      <HomeLayout>
        <form
          className="h-full flex items-center justify-center text-white"
          onSubmit={verifySubscription}
          action=""
        >
          <div className=" mt-24  ml-3 mr-3  flex flex-col gap-4  sm:shadow-[0_0_10px_black] rounded-lg">
            <h1 className="bg-yellow-500 flex items-start justify-center border w-full text-center py-4 text-xl sm:text-2xl font-bold rounded-t-lg ">
              Subscription Bundle
            </h1>

            <div className="px-4 mt-4 space-y-5 text-center">
              <p className="text-[17px]">
                This purchase will allow you to access all available course of
                our platform for{" "}
                <span className="text-yellow-500 font-bold">
                  <br />1 Year
                </span>
                . All the existing and new launched courses will be also
                available for
              </p>
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                <BiRupee />
                <span>10</span> only
              </p>
              <div>
                <p>100% refund on cancellation</p>
                <p>*Terms and Conditions applied*</p>
              </div>
              <button
                type="submit"
                disabled={!subscribed}
                className={`transition-all ease-in-out duration-300  bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 
                  ${subscribed ? "bg-yellow-500 hover:bg-yellow-600": "bg-gray-400 cursor-not-allowed opacity-70"}`}
              >
                {subscribed ? "Buy now" : <div className="spinner"></div>}
              </button>
            </div>

          </div>
        </form>
      </HomeLayout>
    </div>
  );
}

export default Checkout;
