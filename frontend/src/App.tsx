import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/auth/authSlice";
import LandingPage from "./pages/LandingPage";
import CalculationPage from "./pages/CalculationPage";
import { useGetUserQuery } from "./redux/api/authApi";
import { getCookie } from "./utils/customCookie";
function App() {
  const { user } = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();
  const token = getCookie("token");
  const { data: getUser } = useGetUserQuery({});

  useEffect(() => {
    const ac = new AbortController();
    if (token && getUser) {
      dispatch(
        setUser({
          data: {
            token: token,
            user: getUser?.data.user,
            student: getUser?.data.student,
          },
        })
      );
    }
  }, [dispatch, getUser]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<HomePage />} />
            {/* <Route path="/calculation" element={<CalculationPage />} /> */}
          </Route>
          <Route path="/admin" element={<ProtectedRoute />}>
            {/* <Route path="/admin" element={<HomePage />} /> */}
            <Route path="/admin/calculation" element={<CalculationPage />} />
          </Route>
          {/* <Route path="/tourist" element={<ProtectedRoute />}>
            <Route path="/tourist" element={<TouristPage />} />
            <Route path=":id" element={<DetailTouristPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
