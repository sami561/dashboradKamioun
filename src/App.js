import React, { useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "state/authSlice";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Auth from "scenes/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "scenes/category";
import Brand from "scenes/brand";
import Supplier from "scenes/supplier";
import Ads from "scenes/ads";
import Cart from "scenes/cart";
import Orders from "scenes/orders";
import Profile from "scenes/profile";
import OrderOperation from "scenes/orderOperation";
import Vendors from "scenes/vendors";
import OperationsTeam from "scenes/operationsTeam";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);
  const token = useSelector((state) => state.auth.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={<Navigate to={token ? "/dashboard" : "/auth"} replace />}
            />
            <Route
              path="/auth"
              element={!token ? <Auth /> : <Navigate to="/dashboard" replace />}
            />
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  token ? <Dashboard /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/category"
                element={
                  token ? <Category /> : <Navigate to="/category" replace />
                }
              />
              <Route
                path="/brand"
                element={token ? <Brand /> : <Navigate to="/brand" replace />}
              />
              <Route
                path="/suppliers"
                element={token ? <Supplier /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/products"
                element={token ? <Products /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/customers"
                element={
                  token ? <Customers /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/transactions"
                element={
                  token ? <Transactions /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/geography"
                element={
                  token ? <Geography /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/overview"
                element={token ? <Overview /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/daily"
                element={token ? <Daily /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/monthly"
                element={token ? <Monthly /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/breakdown"
                element={
                  token ? <Breakdown /> : <Navigate to="/auth" replace />
                }
              />
              <Route
                path="/admin"
                element={token ? <Admin /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/performance"
                element={
                  token ? <Performance /> : <Navigate to="/auth" replace />
                }
              />

              <Route
                path="/cart"
                element={token ? <Cart /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/orders"
                element={token ? <Orders /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/ads"
                element={token ? <Ads /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/profile"
                element={token ? <Profile /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/order-operation"
                element={
                  token &&
                  JSON.parse(localStorage.getItem("userData"))?.accountType ===
                    "operation" ? (
                    <OrderOperation />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />
              <Route
                path="/vendors"
                element={token ? <Vendors /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/operations-team"
                element={
                  token ? <OperationsTeam /> : <Navigate to="/auth" replace />
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
