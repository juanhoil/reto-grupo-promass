import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { LoginLayout } from "./layouts/LoginLayout";
import { NotFound } from "./pages/404";
import { Templates } from "./pages/Campaigns/CampaignTemplates";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { logout, useLoginStore } from "./store/useLoginStore";

function App() {
  const { token } = useLoginStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!token && pathname !== "/reset-password") {
      logout();
      navigate("/login");
    }
  }, [token, navigate, pathname]);

  return (
    <div className="w-full h-screen max-w-2xl sm:max-w-full lg:overflow-auto">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/post" element={<Templates />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
