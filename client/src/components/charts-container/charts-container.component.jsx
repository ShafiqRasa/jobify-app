import Wrapper from "./charts-container.styles";
import AreaChartComponent from "../area-chart/area-chart.component";
import BarChartComponent from "../bar-chart/bar-chart.component";
import { useStatsContext } from "../../pages/stats/stats.page";
import { useState } from "react";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications } = useStatsContext();

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {barChart ? (
        <BarChartComponent data={monthlyApplications} />
      ) : (
        <AreaChartComponent data={monthlyApplications} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
