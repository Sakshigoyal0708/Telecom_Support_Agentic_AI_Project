
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../components/pages/DashboardPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
