import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../axios/axiosInstance";
import SimpleNav from "../components/navbar/SimpleNav";
import ModernNav from "../components/navbar/ModernNav";
import PhoneNavbar from "../components/navbar/PhoneNavbar";
import Footer from "../components/footer/Footer";

const Unsubscribe = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      instance
        .get(`/newsletter/unsubscribe/${token}`)
        .then(() => {
          setStatus("success");
          setMessage("Έχετε διαγραφεί επιτυχώς από το newsletter μας.");
        })
        .catch((error) => {
          setStatus("error");
          setMessage(error.response?.data?.message || "Σφάλμα κατά τη διαγραφή.");
        });
    }
  }, [token]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="xl:hidden block">
        <PhoneNavbar />
      </div>
      <div className="xl:block hidden">
        <SimpleNav />
        <ModernNav />
      </div>

      <div className="container mx-auto px-4 py-24 text-center">
        {status === "loading" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Επεξεργασία...</h2>
            <p className="text-gray-600">Παρακαλώ περιμένετε</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Επιτυχής Διαγραφή</h2>
            <p className="text-gray-700 mb-8">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#9544cf] text-white rounded-lg hover:bg-[#7a36a8] transition-all"
            >
              Επιστροφή στην Αρχική
            </button>
          </div>
        )}

        {status === "error" && (
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Σφάλμα</h2>
            <p className="text-gray-700 mb-8">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#9544cf] text-white rounded-lg hover:bg-[#7a36a8] transition-all"
            >
              Επιστροφή στην Αρχική
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Unsubscribe;
