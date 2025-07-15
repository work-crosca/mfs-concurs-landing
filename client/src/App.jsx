import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import InscrierePage from "./pages/InscrierePage";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscriere" element={<InscrierePage />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route path="*" element={<NotFound />} />
        {/* ruta pentru galerie */}
        {/*<Route path="/votare" element={<VotarePage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
