import React from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { sendContact } from "../../helpers/email";
import { toast } from "react-toastify";

type Props = {};
interface IFormInput {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
  email: string;
}
const Contact = (props: Props) => {
  const snackbarRef = React.useRef<any>(null);

  const [message, setMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    sendContact(formData)
      .then(()=>{
        reset();
        toast.success('Email has been sent successfully.',{position: "top-left"})
      })
      .catch((error) => toast.error('Email has failed to be sent.',{position:'top-left'}));
  };
 
  return (
    <div className="justify-center flex flex-col items-center text-center  w-screen">
      <div className="bg-[#9544cf]/90 xl:w-1/3 lg:px-0 w-screen  rounded-lg py-12">
        <div>
          <h4 className="text-xl text-slate-100 font-semibold">ΕΠΙΚΟΙΝΩΝΙΑ</h4>
        </div>

        <div className="flex flex-col lg:justify-between justify-start items-center px-16 mt-6">
          <div className="space-x-2">
            <AiOutlineMail size={32} color="white" className="inline-block" />
            <h4 className="inline-block text-slate-50">
              itsallpolitics2023@gmail.com
            </h4>
          </div>
          <div className="space-x-2">
            <AiOutlineInstagram
              size={32}
              color="white"
              className="inline-block"
            />
            <a
              href="https://www.instagram.com/itsallpolitics.gr/"
              className="inline-block text-slate-50"
            >
              itsallpolitics.gr
            </a>
          </div>
          <div className="space-x-2">
            <AiOutlineFacebook
              size={32}
              color="white"
              className="inline-block"
            />
            <a
              href="https://www.facebook.com/profile.php?id=100091351862257"
              className="inline-block text-slate-50"
            >
              itsallpolitics.gr
            </a>
          </div>
           <div className="space-x-2">
            <AiOutlineLinkedin
              size={32}
              color="white"
              className="inline-block"
            />
            <a
              href="https://www.linkedin.com/company/its-all-politics-gr/"
              className="inline-block text-slate-50"
            >
              itsallpolitics.gr
            </a>
          </div>
        </div>
        <div className="mt-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4  lg:px-16 px-8 py-12 rounded-lg"
          >
            <div className="xl:flex 2xl:flex-row flex flex-col lg:space-y-4 2xl:space-y-0 space-y-4 lg:justify-center 2xl:space-x-2">
              <div className="flex flex-col w-full">
                {errors.firstName && (
                  <span role="alert" className=" text-white text-center">
                    {errors.firstName.message}
                  </span>
                )}
                <input
                  placeholder="Όνομα"
                  {...register("firstName", {
                    required: "Το όνομα είναι υποχρεωτικό",
                  })}
                  className={`p-2  outline-none rounded-md border-2 ${
                    errors.firstName ? "border-2 border-red-500" : ""
                  }`}
                />
              </div>
              <div className="flex flex-col w-full">
                {errors.lastName && (
                  <span role="alert" className=" text-white text-center">
                    {errors.lastName.message}
                  </span>
                )}
                <input
                  placeholder="Επώνυμο"
                  {...register("lastName", {
                    required: "Το επώνυμο είναι υποχρεωτικό",
                  })}
                  className={`p-2  outline-none rounded-md border-2 ${
                    errors.lastName ? "border-2 border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              {errors.lastName && (
                <span role="alert" className=" text-white text-center">
                  {errors.lastName.message}
                </span>
              )}
              <input
                placeholder="Email"
                {...register("email", {
                  required: "Το email είναι υποχρεωτικό",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Μη έγκυρο email.",
                  },
                })}
                className={`p-2  outline-none rounded-md border-2 ${
                  errors.lastName ? "border-2 border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex flex-col">
              {errors.lastName && (
                <span role="alert" className=" text-white text-center">
                  {errors.lastName.message}
                </span>
              )}
              <input
                placeholder="Θεμα"
                {...register("subject", {
                  required: "Το θέμα είναι υποχρεωτικό",
                })}
                className={`p-2  outline-none rounded-md border-2 ${
                  errors.subject ? "border-2 border-red-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              {errors.message && (
                <span role="alert" className=" text-white text-center">
                  {errors.message.message}
                </span>
              )}
              <textarea
                placeholder="Μηνυμα..."
                {...register("message", {
                  required: "Το μήνυμα είναι υποχρεωτικό",
                })}
                className={`p-2  outline-none rounded-md border-2 ${
                  errors.subject ? "border-2 border-red-500" : ""
                }`}
              />
            </div>

            <button
              type="submit"
              className="bg-slate-50 py-4 mx-auto block rounded-md text-gray-900 px-12 mt-4 hover:bg-[#9544cf] hover:text-slate-50 transition-all duration-500"
            >
              Αποστολή
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
