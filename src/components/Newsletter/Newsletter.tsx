import React, { useState } from "react";
import { instance } from "../../axios/axiosInstance";
import { toast } from "react-toastify";

type Props = {};

const Newsletter = (props: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email");
      return;
    }

    setLoading(true);
    
    try {
      const response = await instance.post("/newsletter/subscribe", { email });
      toast.success("Επιτυχής εγγραφή στο newsletter!");
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Σφάλμα κατά την εγγραφή";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#9544cf] to-purple-600 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Εγγραφείτε στο Newsletter μας
        </h3>
        <p className="text-white/90 mb-8 text-lg">
          Λάβετε τα τελευταία άρθρα και αναλύσεις απευθείας στο email σας
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Το email σας"
            className="px-6 py-3 rounded-lg w-full md:w-96 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-white text-[#9544cf] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            {loading ? "Εγγραφή..." : "Εγγραφή"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
