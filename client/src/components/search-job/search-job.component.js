import { useEffect, useState } from "react";
import Wrapper from "../../pages/add-job/add-job.page.styles";
import {
  jobStatusOptions,
  jobTypeOptions,
  sortOptions,
} from "../../utils/formik/formik.utils";
import { useJobContext } from "../../pages/all-jobs/all-jobs.page";

const SearchJob = () => {
  const { setFilter } = useJobContext();
  const [search, setSearch] = useState("");
  const [jobStatus, setJobStatus] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [sort, setSort] = useState("newest");

  const handleFilter = () => {
    const filter = `${search && `search=${search}&`}${
      jobStatus && `jobStatus=${jobStatus}&`
    }${jobType && `jobType=${jobType}&`}${sort && `sort=${sort}&`}`;
    setFilter(filter);
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    setSearch("");
    setJobStatus("all");
    setJobType("all");
    setSort("newest");
  };
  useEffect(() => {
    handleFilter();
  }, [search, jobStatus, jobType, sort]);

  return (
    <Wrapper>
      <h4 className="form-title">Search</h4>

      <form className="add-job-form">
        <div className="form-row">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <input
            type="text"
            name="search"
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="jobStatus" className="form-label">
            Job Status
          </label>
          <select
            name="jobStatus"
            className="form-select"
            value={jobStatus}
            onChange={(e) => setJobStatus(e.target.value)}
          >
            {jobStatusOptions.map(({ id, name, value }) => (
              <option key={id} value={value} className="option">
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="jobType" className="form-label">
            Job Type
          </label>
          <select
            name="jobType"
            className="form-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            {jobTypeOptions.map(({ id, name, value }) => (
              <option key={id} value={value} className="option">
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="sort" className="form-label">
            Sort
          </label>
          <select
            name="sort"
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map(({ id, name, value }) => (
              <option key={id} value={value} className="option">
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="btn"
          onClick={handleResetFilter}
          className="btn btn-block"
        >
          Reset Search
        </button>
      </form>
    </Wrapper>
  );
};
export default SearchJob;
