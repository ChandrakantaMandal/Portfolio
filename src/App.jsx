import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import BackToTop from "./components/BackToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import ChatSystem from "./components/LiveChat/ChatSystem";
import LoadingPage from "./components/LoadingPage";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";
import ThemeNotification from "./components/ThemeNotification";
import { ThemeProvider } from "./contexts/ThemeContext";

// import usePageTracking from "./hooks/usePageTracking"; // Temporarily disabled

const Hero = lazy(() => import("./pages/Hero"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Component to handle page tracking
const AppContent = () => {
  
  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Projects />
                <Contact />
              </main>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <BackToTop />
      <ThemeNotification />
      <ChatSystem />
    </>
  );
};


function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <AppContent />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
