import { Formik, Form, FormikValues } from "formik";
import TextField from "../components/TextFields/TextField";
import Button from "../components/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { UserLoginFormValues } from "../model/User";
import { useSigninUserMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { sleep } from "../utils/sleep";
import { getCookie, setCookie } from "../utils/customCookie";
import Spinner from "../components/Spinner";
import classNames from "../utils/tailwindClassNames";
import { setUser } from "../redux/auth/authSlice";

function LoginPage() {
  const initialValues: UserLoginFormValues = {
    email: "",
    password: "",
  };
  const formikRef = useRef<FormikValues>() as any;
  const [errors, setErrors] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const [signinUser, { isLoading }] = useSigninUserMutation();
  const dispatch = useAppDispatch();
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token]);

  const login = async (values: UserLoginFormValues) => {
    signinUser({ ...values })
      .unwrap()
      .then((res) => {
        toast.success("Login Successfully");
        navigate("/admin/dashboard");
        if (res) {
          dispatch(
            setUser({
              data: {
                user: res.data?.user,
                student: res.data?.student,
                token: res.data?.token,
              },
            })
          );
          setCookie("user", res.data?.user);
          setCookie("token", res.data?.token);
        }
      })
      .catch((err) => toast.error("Error! Please try again."));
    if (errors) {
      await sleep(3000);
      setErrors([]);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1">
      <div className="grid grid-cols-1 place-content-center">
        <div className="p-4 md:p-8 lg:mx-[30vw]">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={login}
          >
            {() => (
              <Form>
                <div className="mb-6">
                  <h3 className="text-3xl font-extrabold text-black-secondary mb-1">
                    Welcome Back!
                  </h3>
                  <p className="text-black-secondary text-opacity-50 text-sm">
                    Please login with your valid credentials.
                  </p>
                </div>
                {errors.length > 0 && (
                  <div className="bg-red-500 bg-opacity-5 transition-all delay-75 border-2 border-red-500 rounded-lg w-full py-2 px-6">
                    {errors.map((item) => (
                      <ul key={item} className="text-red-500 list-disc text-sm">
                        <li>{item}</li>
                      </ul>
                    ))}
                  </div>
                )}
                <div>
                  <TextField
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="insert your password..."
                  />
                  <button
                    className={classNames(
                      "px-6 py-[9px] w-full font-medium text-base rounded-lg transition-all delay-75 flex items-center justify-center",
                      `disabled:opacity-50 disabled:bg-opacity-100 bg-blue-500 hover:bg-opacity-80 text-white`
                    )}
                  >
                    {isLoading && <Spinner />}
                    Login
                  </button>
                  <div className="mt-6 text-center">
                    <span className="text-black-secondary text-opacity-50 text-sm">
                      Don't have an account?{" "}
                      <Link to={"/register"}>
                        <span className="text-blue-500 font-semibold transition-all delay-75 hover:text-opacity-90 text-sm">
                          Register
                        </span>
                      </Link>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* <div className="hidden border border-blue-500 md:block"></div> */}
    </div>
  );
}

export default LoginPage;
