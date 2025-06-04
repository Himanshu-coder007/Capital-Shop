import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AccountSlice from "./AccountSlice";

const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLoginButtonClick = (e) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(user => user.account === e.account && user.password === e.password);
      
      if (user) {
        localStorage.setItem("loginSuccess", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        dispatch(AccountSlice.actions.LogginSuccess());
        navigate("/home");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Username or password incorrect.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: Yup.object({
      account: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    onSubmit: (value) => {
      handleLoginButtonClick(value);
    },
  });

  return (
    <div className="w-full">
      <div className="px-2 md:px-40 py-6 md:py-20 font-jost">
        <div className="shadow-2xl px-10 py-20 md:max-w-[60%]  flex flex-col m-auto">
          <p className="text-center text-3xl font-semibold">Login</p>
          <p className=" text-center text-base font-normal mt-5">
            Enter Login details to get access
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-10 flex flex-col">
            <label htmlFor="account" className="text-base font-medium">
              Username Or Email Address
            </label>
            <input
              id="account"
              type="text"
              value={formik.values.account}
              onChange={formik.handleChange}
              className="border-gray-500 mt-4"
              placeholder="Username / Email address"
            />
            {formik.errors.account && formik.touched.account && (
              <p className="text-red-600 text-base">{formik.errors.account}</p>
            )}
            <label htmlFor="password" className="text-base font-medium mt-6">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              className=" mt-4"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-base">{formik.errors.password}</p>
            )}
            <div className="flex items-center mt-14 justify-between">
              <p className=" text-base font-normal">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  {" "}
                  Sign Up
                </Link>{" "}
                here
              </p>
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-primary cursor-pointer text-white "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;