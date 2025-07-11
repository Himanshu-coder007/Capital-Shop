// src/App.js
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import Blog from "./pages/Blog/Blog";
import Contactus from "./pages/Contact Us/Contactus";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Category = lazy(() => import("./pages/Category/Category"));
const ProductDetail = lazy(() => import("./pages/Product Details/ProductDetail"));
const Register = lazy(() => import("./pages/Login/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Careers = lazy(() => import("./pages/Careers/Careers"));

function App() {
  const RequireAuth = ({ children }) => {
    return localStorage.getItem("loginSuccess") === "true" ? children : <Navigate to="/login" />;
  };

  const RequireNoAuth = ({ children }) => {
    return localStorage.getItem("loginSuccess") === "true" ? <Navigate to="/home" /> : children;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Header />
        <ScrollToTop />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            
            {/* Public routes */}
            <Route
              path="/home"
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <ProductDetail />
                </Suspense>
              }
            />
            <Route
              path="/category/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <Category />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<Loader />}>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Loader />}>
                  <Contactus />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loader />}>
                  <AboutUs />
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<Loader />}>
                  <Privacy />
                </Suspense>
              }
            />
            <Route
              path="/faq"
              element={
                <Suspense fallback={<Loader />}>
                  <FAQ />
                </Suspense>
              }
            />
            <Route
              path="/careers"
              element={
                <Suspense fallback={<Loader />}>
                  <Careers />
                </Suspense>
              }
            />
            
            {/* Authentication routes */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                  <RequireNoAuth>
                    <Login />
                  </RequireNoAuth>
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loader />}>
                  <RequireNoAuth>
                    <Register />
                  </RequireNoAuth>
                </Suspense>
              }
            />
            
            {/* Protected routes */}
            <Route
              path="/cart"
              element={
                <Suspense fallback={<Loader />}>
                  <RequireAuth>
                    <Cart />
                  </RequireAuth>
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;