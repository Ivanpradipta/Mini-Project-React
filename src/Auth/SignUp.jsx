import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../Header/HeaderSignup";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

    } catch (err) {
      console.log(err);
    }
    alert("berhasil daftar")
  };

  return (
    <>
      <HeaderAdmin />
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background*/}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_xlmz9xwm.json"
                background="transparent"
                speed="1"
                width= {10}
                loop
                autoplay
              ></lottie-player>
            </div>
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={handleSubmit(onsubmit)}>
                {/* Email input */}
                <div className="relative mb-6" data-te-input-wrapper-init="">
                  <input
                    {...register("email")}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput3"
                    placeholder="Email@mail.com"
                  />
                </div>
                {/* Password input */}
                <div className="relative mb-6" data-te-input-wrapper-init="">
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput33"
                    placeholder="Password"
                    {...register("password", {
                      required: "This input is required.",
                      minLength: {
                        value: 6,
                        message: "Password at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-700">
                      {" "}
                      {errors?.password?.message}{" "}
                    </p>
                  )}
                </div>
                {/* Submit button */}
                <button
                  className="w-full mb-5 bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
