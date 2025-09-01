import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Layout/Sidebar";

// Pages
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import './App.css'

// Layout for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public front page */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/game"
        element={
          <PrivateRoute>
            <AuthenticatedLayout>
              <Game />
            </AuthenticatedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <PrivateRoute>
            <AuthenticatedLayout>
              <Leaderboard />
            </AuthenticatedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <AuthenticatedLayout>
              <Profile />
            </AuthenticatedLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
