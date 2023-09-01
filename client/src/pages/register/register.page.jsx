import { useState } from "react";
import Wrapper from "./register.page.styles";
import { useNavigate } from "react-router-dom";
import { FormControl, Logo } from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  lastname: "",
  location: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, "should be between 3-50 charectors long")
    .max(50, "should be between 3-50 charectors long"),
  lastname: Yup.string()
    .required("lastname is required")
    .min(3, "should be between 3-50 charectors long")
    .max(50, "should be between 3-50 charectors long"),
  location: Yup.string().required("location is required"),
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(8, "at least 8 charectors long"),
});

const Register = () => {
  const navigate = useNavigate();

  const toggleMember = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      toast.success("resgistration successfull");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper className="full-page">
      <div className="form">
        <Logo />
        <h3>Register</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl
                element="input"
                type="text"
                name="name"
                label="Name"
              />
              <FormControl
                element="input"
                type="text"
                name="lastname"
                label="Last Name"
              />
              <FormControl
                element="input"
                type="text"
                name="location"
                label="Location"
              />
              <FormControl
                element="input"
                type="email"
                name="email"
                label="Email"
              />
              <FormControl
                element="input"
                type="password"
                name="password"
                label="Password"
              />
              <button
                type="submit"
                className="btn btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "submitting..." : "Submit"}
              </button>
              {/* <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setUser({
              currentUser: { email: "testUser@test.com", password: "secret" },
              endPoint: "login",
              alertText: "Login Successful! Redirecting...",
            });
          }}
        >
          {isLoading ? "loading..." : "demo app"}
        </button> */}
              <p>
                Already a member?
                <button
                  type="button"
                  onClick={toggleMember}
                  className="member-btn"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};
export default Register;
