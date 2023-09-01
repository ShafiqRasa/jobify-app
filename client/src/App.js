import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Register,
  Dashboard,
  Login,
  AllJobs,
  Stats,
  AddJob,
  Profile,
} from "./pages";
import { EditJob } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index path="stats" element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job/:id" element={<EditJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
