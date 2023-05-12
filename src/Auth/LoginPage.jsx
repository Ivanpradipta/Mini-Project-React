import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import HeaderUser from "../Header/HeaderLogin";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    setLoading(true);
    setIsError(false);
    event.preventDefault();
    setTimeout(() => {
    if (username == "admin") {
      const dummyUser = { username: "admin", password: "admin" };
      if (username === dummyUser.username && password === dummyUser.password) {
        navigate("/admin");
      }
    } else {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/user");
        })
        .catch(() => {});
    }

      setLoading(false);
      setIsError("");
    }, 1000);
  };

  return (
    <>
      <HeaderUser />
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background*/}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_xlmz9xwm.json"
                background="transparent"
                speed="1"
                width={10}
                loop
                autoplay
              ></lottie-player>
            </div>
            {/* Right column container with form */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form>
                {/* Email input */}
                <div className="relative mb-6" data-te-input-wrapper-init="">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput3"
                    placeholder="Email address"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                {/* Password input */}
                <div className="relative mb-6" data-te-input-wrapper-init="">
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="exampleFormControlInput33"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  className="flex justify-center w-full bg-indigo-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 uppercase"
                  
                  onClick={handleLogin}
                  disabled={loading}

                >
                  {loading && (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    Login
                </button>
                {isError && (
                  <div className="text-red-500 mt-2">
                    Email or Password is incorrect.
                  </div>
                )}

                <div className="pt-1 text-md font-semibold">
                  <p className="text-md">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      class="text-red-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                      data-te-ripple-init=""
                      data-te-ripple-color="light"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
