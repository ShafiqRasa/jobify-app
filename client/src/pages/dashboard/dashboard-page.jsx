import { Wrapper } from "./dashboard-page.styles";
import { Outlet } from "react-router-dom";
import { SmallSidebar, BigSidebar, Navbar } from "../../components";
import { DashboardProvider } from "../../context/dashboard.context";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default Dashboard;
