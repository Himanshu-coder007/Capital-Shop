import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";

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
        <ScrollToTop /> {/* Add ScrollToTop component here */}
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