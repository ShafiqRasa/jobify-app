import { Form, Formik } from "formik";
import FormControl from "../../components/form-control/form-control.component";
import Wrapper from "../add-job/add-job.page.styles";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import { jobStatus, jobTypes } from "../../utils/job-details/job-details.utils";
import {
  profileInitialValues as initialValues,
  profileValidationSchema as validationSchema,
} from "../../utils/formik/formik.utils";
import { useDashboardContext } from "../../context/dashboard.context";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user } = useDashboardContext();
  const navigate = useNavigate();
  const onSubmit = async (data, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("profile", data.profile);
      formData.append("name", data.name);
      formData.append("email", data.email);
      console.log("form data", formData);
      api.patch("/users/update-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      toast.success("user updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <h4 className="form-title">User Profile</h4>
      {user ? (
        <Formik
          initialValues={{
            profile: "",
            name: user?.name || "",
            lastname: user?.lastname || "",
            email: user?.email || "",
            location: user?.location || "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form enctype="multipart/form-data" className="add-job-form">
              <FormControl
                element="file"
                type="file"
                name="profile"
                label="Select an Image (Max 0.5MB)"
                formik={formik}
              />
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
                type="email"
                name="email"
                label="Email"
              />
              <FormControl
                element="input"
                type="text"
                name="location"
                label="Location"
              />
              <button
                type="submit"
                className="btn btn-block"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>loading...</div>
      )}
    </Wrapper>
  );
};
export default Profile;
