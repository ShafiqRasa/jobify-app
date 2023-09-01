import { Form, Formik } from "formik";
import FormControl from "../../components/form-control/form-control.component";
import Wrapper from "./add-job.page.styles";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import {
  jobInitialValues as initialValues,
  jobValidationSchema as validationSchema,
} from "../../utils/formik/formik.utils";
import { jobStatus, jobTypes } from "../../utils/job-details/job-details.utils";

const AddJob = () => {
  const onSubmit = async (data, { resetForm }) => {
    try {
      await api.post("/jobs", data);
      toast.success("job created successfully");
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <h4 className="form-title">Add Job</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-job-form">
            <FormControl
              element="input"
              type="text"
              name="position"
              label="Position"
            />
            <FormControl
              element="input"
              type="text"
              name="company"
              label="Company"
            />
            <FormControl
              element="input"
              type="text"
              name="jobLocation"
              label="Job Location"
            />
            <FormControl
              element="select"
              type="select"
              name="jobStatus"
              label="Job Status"
              options={jobStatus}
            />
            <FormControl
              element="select"
              type="select"
              name="jobType"
              label="Job Type"
              options={jobTypes}
            />
            <button
              type="submit"
              className="btn btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default AddJob;
