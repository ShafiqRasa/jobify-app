import { useNavigate } from "react-router-dom";
import { Logo } from "../../components";
import { FormControl } from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import Wrapper from "../register/register.page.styles";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(8, "at least 8 charectors long"),
});

const Login = () => {
  const navigate = useNavigate();
  const toggleMember = () => {
    navigate("/register");
  };
  const onSubmit = async (data) => {
    try {
      const {
        data: { role },
      } = await api.post("/auth/login", data);
      toast.success("login successfull");
      role === "admin"
        ? navigate("/dashboard/stats")
        : navigate("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper className="full-page">
      <div className="form">
        <Logo />
        <h3>Login</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
              <button
                type="button"
                className="btn btn-block btn-hipster"
                disabled={isSubmitting}
                onClick={() =>
                  onSubmit({
                    email: "geust@geust.com",
                    password: "geust123",
                  })
                }
              >
                {isSubmitting ? "loading..." : "demo app"}
              </button>
              <p>
                Not a member yet?
                <button
                  type="button"
                  onClick={toggleMember}
                  className="member-btn"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </Wrapper>
  );
};
export default Login;
