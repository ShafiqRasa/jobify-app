import { useJobContext } from "../../pages/all-jobs/all-jobs.page";
import Wrapper from "./jobs-list-component.styles";
import Job from "../job/job.component";

const Jobs = () => {
  const { jobs } = useJobContext();
  return (
    <Wrapper>
      <h5>
        {jobs?.length || 0} job{jobs?.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default Jobs;
