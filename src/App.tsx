import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";
import { RequestPasswordRecovery } from "@/modules/auth/components/RequestPasswordRecovery";
import { ResetPassword } from "@/modules/auth/components/ResetPassword";
import { ProtectedRoute } from "@/core/routes/ProtectedRoute";
import HomeV2 from "@/pages/HomeV2";
import Dashboard from "@/pages/Dashboard";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/version-2" element={<HomeV2 />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/recover-password"
          element={<RequestPasswordRecovery />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
