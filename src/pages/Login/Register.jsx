import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Register = () => {
  document.title = "Register";
  const navigate = useNavigate();
  
  const handleRegisterButtonClick = (e) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.some(user => user.account === e.account);
      
      if (userExists) {
        throw new Error("User already exists");
      }
      
      const newUser = {
        account: e.account,
        password: e.password
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loginSuccess", "false");
      
      toast.success("Sign up successfully! Please log in.", {
        position: "top-right",
        autoClose: 3000,
      });
      
      navigate("/login");
    } catch (error) {
      toast.error("Account already exists.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
      againPassword: "",
    },
    validationSchema: Yup.object({
      account: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
      againPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
    onSubmit: (value) => {
      handleRegisterButtonClick({
        account: value.account,
        password: value.password,
      });
    },
  });

  return (
    <div className="w-full">
      <div className="px-2 md:px-40 py-6 md:py-20 font-jost">
        <div className="shadow-2xl px-10 py-20 md:max-w-[60%]  flex flex-col m-auto">
          <p className="text-center text-3xl font-semibold">Sign Up</p>
          <p className=" text-center text-base font-normal mt-5">
            Create your account to get full access
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
            <label
              htmlFor="againPassword"
              className="text-base font-medium mt-6"
            >
              Confirm Password
            </label>
            <input
              id="againPassword"
              type="password"
              value={formik.values.againPassword}
              onChange={formik.handleChange}
              placeholder="Confirm Password"
              className=" mt-4"
            />
            {formik.errors.againPassword && formik.touched.againPassword && (
              <p className="text-red-600 text-base">{formik.errors.againPassword}</p>
            )}
            <div className="flex items-center mt-14 justify-between">
              <p className=" text-base font-normal">
                Already have an account?
                <Link to="/login" className="text-primary">
                  {" "}
                  Login{" "}
                </Link>{" "}
                here
              </p>
              <button
                type="submit"
                className="px-6 py-3 text-sm md:text-lg rounded-md bg-primary cursor-pointer text-white "
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;