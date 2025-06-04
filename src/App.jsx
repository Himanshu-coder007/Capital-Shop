import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home/Home"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Category = lazy(() => import("./pages/Category/Category"));
const ProductDetail = lazy(() => import("./pages/Product Details/ProductDetail"));
const Register = lazy(() => import("./pages/Login/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  const RequireLogin = ({ children }) => {
    if (localStorage.getItem("loginSuccess") === "true") {
      return <Navigate to="/home" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
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
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                  <RequireLogin>
                    <Login />
                  </RequireLogin>
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<Loader />}>
                  <RequireLogin>
                    <Register />
                  </RequireLogin>
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<Loader />}>
                  <Cart />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;