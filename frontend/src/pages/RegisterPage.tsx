import { Formik, Form, FormikValues } from "formik";
import TextField from "../components/TextFields/TextField";
import Button from "../components/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { RegisterUserWithStudent, User } from "../model/User";
import { useSignupUserMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { sleep } from "../utils/sleep";
import { getCookie, setCookie } from "../utils/customCookie";
import classNames from "../utils/tailwindClassNames";

function RegisterPage() {
  const initialValues: Partial<RegisterUserWithStudent> = {
    name: "",
    address: "",
    telp: "",
    age: "",
    school_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const formikRef = useRef<FormikValues>() as any;
  const [errors, setErrors] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const token = getCookie("token");
  const [signupUser, { data, isLoading, error, isError, isSuccess }] =
    useSignupUserMutation();

  const login = async (values: any) => {
    values.password_confirmation = values.password;
    signupUser({ ...values })
      .unwrap()
      .then((res) => {
        toast.success("Login Successfully");
        navigate("/admin/dashboard");
        if (res) {
          setCookie("token", res.data?.token);
        }
      });
    if (errors) {
      await sleep(3000);
      setErrors([]);
    }
  };

  // useEffect(() => {
  //   const ac = new AbortController();
  //   if (isError) {
  //     //Formik Actions
  //     formikRef.current.setSubmitting(false);
  //     formikRef.current.resetForm();

  //     //Get Error object
  //     const errorObj = Object.assign(error as any);

  //     //Switch case with error status
  //     switch (errorObj.status) {
  //       case 400:
  //         setErrors(errorObj.data.message);
  //         toast.error(`Bad Request [${errorObj.status}]`, {
  //           duration: 3000,
  //           position: "bottom-center",
  //         });
  //         break;
  //       case 500:
  //         toast.error(`${errorObj.data.message}`, {
  //           duration: 3000,
  //           position: "bottom-center",
  //         });
  //         break;
  //       default:
  //         toast.error(`Unexpected Error`, {
  //           duration: 3000,
  //           position: "bottom-center",
  //         });
  //         break;
  //     }
  //   }
  //   if (isSuccess) {
  //     toast.success("Successfully registered", {
  //       duration: 3000,
  //       position: "bottom-center",
  //     });
  //     formikRef.current.setSubmitting(false);
  //     navigate("/login");
  //   }

  //   return () => {
  //     ac.abort();
  //   };
  // }, [isError, isSuccess, data, dispatch, error, navigate]);

  useEffect(() => {
    const ac = new AbortController();
    if (token) {
    }
    return () => {
      ac.abort();
    };
  }, [token, navigate]);

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
                    Greetings
                  </h3>
                  <p className="text-black-secondary text-opacity-50 text-sm">
                    Come and be part of our school part
                  </p>
                </div>

                <div>
                  <TextField
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="insert your name..."
                  />

                  <TextField
                    label="School Name"
                    type="text"
                    name="school_name"
                    placeholder="insert your school name..."
                  />
                  <TextField
                    label="Age"
                    type="number"
                    name="age"
                    className="block p-2.5 w-16 text-sm  text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400"
                  />
                  <TextField
                    label="Address"
                    type="text"
                    as="textarea"
                    name="address"
                    className="block p-2.5 w-full text-sm  text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400"
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    name="telp"
                    placeholder=""
                  />
                  {/* <TextField
                    label="School Name"
                    type="text"
                    name="name"
                    placeholder="insert your school name..."
                  /> */}
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

                  <Button
                    bgColor="blue-500"
                    className="text-white w-full mt-6"
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {isLoading ? "Checking..." : "Register"}
                  </Button>
                  <div className="mt-6 text-center">
                    <span className="text-black-secondary text-opacity-50 text-sm">
                      Already have an account?{" "}
                      <Link to={"/login"}>
                        <span className="text-blue-500 font-semibold transition-all delay-75 hover:text-opacity-90 text-sm">
                          Login
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

export default RegisterPage;
