import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { api } from "../../utils/api/api.utils";
import { toast } from "react-toastify";
import { Jobs, SearchJob, Pagination } from "../../components";

const JobContext = createContext();
const AllJobs = () => {
  const [jobs, setJobs] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const getJobs = async () => {
    try {
      const {
        data: { jobs, totalJobs, currentPage, numOfPages },
      } = await api.get(`/jobs?page=${page}&${filter}`);
      setJobs(jobs);
      setTotalJobs(totalJobs);
      setCurrentPage(currentPage);
      setNumOfPages(numOfPages);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    getJobs();
  }, [page, filter]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        getJobs,
        setFilter,
        totalJobs,
        currentPage,
        numOfPages,
        setPage,
      }}
    >
      <SearchJob />
      <Jobs />
      <Pagination />
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
export default AllJobs;
