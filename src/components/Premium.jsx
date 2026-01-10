import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
   verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Talksy",
      description: "Connect to other peoples",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



    return isUserPremium ? (
    "You're are already a premium user"
  ) : (
    <div className="flex flex-col md:flex-row justify-center gap-10  my-10 items-center 
     ">

      {/* Silver Card */}
      <div className="card  w-72 md:w-96 bg-base-100 shadow-sm border bg-base-200 "  >
        <div className="card-body ">
          <span className="badge badge-warning badge-sm">Silver Membership</span>

          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Premium</h2>
            <span className="text-xl">$29/mo</span>
          </div>

          <ul className="mt-6 flex flex-col gap-2 text-sm">
            <li>✔ Chat with other people</li>
            <li>✔ 100 connection requests/day</li>
            <li>✔ Blue Tick</li>
            <li>✔ 3 months</li>
          </ul>

          <button onClick={()=> handleBuyClick("gold")} className="btn btn-primary mt-6 ">Buy Silver</button>
        </div>
      </div>

      {/* Gold Card */}
      <div className="card w-72 md:w-96 bg-base-100 shadow-sm border bg-base-200">
        <div className="card-body">
          <span className="badge badge-warning badge-sm">Gold Membership</span>

          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Premium</h2>
            <span className="text-xl">$40/mo</span>
          </div>

          <ul className="mt-6 flex flex-col gap-2 text-sm">
            <li>✔ Chat with other people</li>
            <li>✔ Unlimited connection requests</li>
            <li>✔ Blue Tick</li>
            <li>✔ 6 months</li>
          </ul>

          <button onClick={()=> handleBuyClick("gold")} className="btn btn-secondary mt-6">Buy Gold</button>
        </div>
      </div>

    </div>
  )
}

export default Premium
