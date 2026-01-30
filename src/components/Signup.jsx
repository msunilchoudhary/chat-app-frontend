import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { setAuthUser } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
  });

  const [messages, setMessages] = useState({});
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertErr, setAlertErr] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForms = () => {
    const errors = {};

    if (!formData.fullname.trim()) errors.fullname = "Fullname is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email";

    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone))
      errors.phone = "Enter valid 10 digit phone number";

    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.cPassword)
      errors.cPassword = "Passwords do not match";

    setMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateForms()) return;

    try {
      const res = await axios.post("/api/user/register", formData);

      const user = res.data.data; 

      setAlertSuccess(res.data.message);
      setAlertErr("");

      
      localStorage.setItem("messanger", JSON.stringify(user));
      setAuthUser(user);

      navigate("/"); 

    } catch (error) {
      setAlertErr(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {/* <span className='text-emerald-500 uppercase flex'>gsaap</span> */}
              Create an account
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
              onSubmit={handleSignupSubmit}
              className="space-y-3 md:space-y-4"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your full name"
                />
                {messages.fullname && (
                  <p className="text-sm text-red-500">{messages.fullname}</p>
                )}
              </div>
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
                  value={formData.email}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                />
                {messages.email && (
                  <p className="text-sm text-red-500">{messages.email}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                  placeholder="Enter your phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {messages.phone && (
                  <p className="text-sm text-red-500">{messages.phone}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {messages.password && (
                  <p className="text-sm text-red-500">{messages.password}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-600 focus:outline-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {messages.cPassword && (
                  <p className="text-sm text-red-500">{messages.cPassword}</p>
                )}
              </div>
             
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
