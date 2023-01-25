import React from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
} from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {};
interface IFormInput {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
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
  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {};
  return (
    <div className="justify-center flex flex-col items-center text-center  w-screen">
      <div className="bg-[#9544cf]/90 lg:w-1/3 lg:px-0 w-screen  rounded-lg py-12">
        <div>
          <h4 className="text-xl text-slate-100">ΕΠΙΚΟΙΝΩΝΙΑ</h4>
        </div>

        <div className="flex flex-col lg:justify-between justify-start items-start px-16 lg:px-48 mt-6">
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
        </div>
        <div className="mt-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4  px-8 py-12 rounded-lg"
          >
            <div className="flex flex-col">
              {errors.firstName && (
                <span role="alert" className=" text-red-600 text-center">
                  {errors.firstName.message}
                </span>
              )}
              <input
                placeholder="Όνομα"
                {...register("firstName", {
                  required: "Title is Required",
                })}
                className={`p-2  outline-none rounded-md border-2 ${
                  errors.firstName ? "border-2 border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex flex-col">
              {errors.lastName && (
                <span role="alert" className=" text-red-600 text-center">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              {errors.subject && (
                <span role="alert" className=" text-red-600 text-center">
                  {errors.subject.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-300 py-4 mx-auto block rounded-md text-gray-700 px-12 mt-4 hover:bg-gray-700 hover:text-indigo-300 transition-all duration-500"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
