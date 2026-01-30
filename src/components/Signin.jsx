import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const { setAuthUser } = useAppContext();
  const navigate = useNavigate();

  const [messages, setMessages] = useState({});
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertErr, setAlertErr] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Prefill email if user exists
  useEffect(() => {
    const savedData = localStorage.getItem("messanger");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData({
          email: parsedData?.email || "",
          password: "",
        });
      } catch {
        localStorage.removeItem("messanger");
      }
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessages((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForms = () => {
    const newMessages = {};

    if (!formdata.email.trim()) {
      newMessages.email = "Email is required.";
      emailRef.current?.focus();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
      newMessages.email = "Invalid email.";
      emailRef.current?.focus();
    }

    if (!formdata.password.trim()) {
      newMessages.password = "Password is required.";
      passwordRef.current?.focus();
    } else if (formdata.password.length < 8) {
      newMessages.password = "Password must be at least 8 characters.";
      passwordRef.current?.focus();
    }

    setMessages(newMessages);
    return Object.keys(newMessages).length === 0;
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    if (!validateForms()) return;

    try {
      const { data } = await axios.post("/api/user/login", formdata);

      // save user
      localStorage.setItem("messanger", JSON.stringify(data.user));
      setAuthUser(data.user);

      setAlertSuccess(data.message || "Login successful");
      setAlertErr("");

      setFormData({ email: "", password: "" });

      // redirect
      navigate("/");
    } catch (err) {
      setAlertErr(err.response?.data?.message || "Login failed");
      setAlertSuccess("");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign In
            </h1>
            {alertSuccess && (
              <p className="text-sm text-green-500 bg-green-100 p-1 rounded-2xl font-semibold text-center">
                {alertSuccess}
              </p>
            )}
            {alertErr && (
              <p className="text-sm text-red-600 bg-red-100 p-1 rounded-2xl font-semibold text-center">
                {alertErr}
              </p>
            )}
            <form
              onSubmit={handleSigninSubmit}
              className="space-y-3 md:space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  value={formdata.email}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                />
                {messages.email && (
                  <p className="text-sm text-red-500">{messages.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  value={formdata.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {messages.password && (
                  <p className="text-sm text-red-500">{messages.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signup here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
