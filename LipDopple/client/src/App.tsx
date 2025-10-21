import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/Footer";
import HomePage from "./pages/HomePage/HomePage";
import PopularDupes from "./pages/PopularDupes";
import Blog from "./pages/Blog";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Main Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/popular" element={<PopularDupes />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
