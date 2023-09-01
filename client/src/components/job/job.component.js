import day from "dayjs";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "./job-component.styles";
import JobInfo from "../job-info/job-info.component";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import { useJobContext } from "../../pages/all-jobs/all-jobs.page";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const { getJobs } = useJobContext();

  const deleteJob = async () => {
    try {
      await api.delete(`/jobs/${_id}`);
      getJobs();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to={`/dashboard/edit-job/${_id}`}
              className="btn edit-btn"
              onClick={() => {}}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={deleteJob}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
