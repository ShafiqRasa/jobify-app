import { Form, Formik } from "formik";
import FormControl from "../form-control/form-control.component";
import Wrapper from "../../pages/add-job/add-job.page.styles";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jobValidationSchema as validationSchema } from "../../utils/formik/formik.utils";
import { jobStatus, jobTypes } from "../../utils/job-details/job-details.utils";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const onSubmit = async (data) => {
    try {
      await api.patch(`/jobs/${id}`, data);
      toast.success("job edited successfully");
      navigate("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  const getJob = async () => {
    try {
      const {
        data: { job },
      } = await api.get(`/jobs/${id}`);
      setJob(job);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJob();
  }, []);
  return (
    <Wrapper>
      <h4 className="form-title">Edit Job</h4>
      {job ? (
        <Formik
          initialValues={{
            position: job?.position,
            company: job?.company,
            jobLocation: job?.jobLocation,
            jobStatus: job?.jobStatus,
            jobType: job?.jobType,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
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
      ) : (
        <div>loading...</div>
      )}
    </Wrapper>
  );
};
export default EditJob;
