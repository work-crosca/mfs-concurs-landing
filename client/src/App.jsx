import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import InscrierePage from "./pages/InscrierePage";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import ImagePage from "./pages/ImagePage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  return (
    <BrowserRouter>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscriere" element={<InscrierePage />} />
        <Route path="*" element={<NotFound />} />
        {/* Gallery */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/image/:id" element={<ImagePage />} />
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdminAuth>
              <AdminDashboard />
            </RequireAdminAuth>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
