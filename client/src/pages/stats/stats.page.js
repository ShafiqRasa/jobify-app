import { useEffect, createContext, useContext, useState } from "react";
// import { useAppContext } from '../../context/appContext'
import { StatsContainer, ChartsContainer } from "../../components";
import { toast } from "react-toastify";
import { api } from "../../utils/api/api.utils";

const StatsContext = createContext();
const Stats = () => {
  const [stats, setStats] = useState(null);
  const [monthlyApplications, setMonthlyApplications] = useState(null);
  const getStats = async () => {
    try {
      const {
        data: { status, monthlyApplications },
      } = await api.get("/jobs/stats");
      setStats(status);
      setMonthlyApplications(monthlyApplications);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    getStats();
  }, []);

  return (
    <StatsContext.Provider value={{ stats, monthlyApplications }}>
      <StatsContainer />
      <ChartsContainer />
    </StatsContext.Provider>
  );
};

export const useStatsContext = () => useContext(StatsContext);
export default Stats;
