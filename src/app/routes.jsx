import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import Home from "../pages/Home";
import Search from "../pages/Search";
import AddMovie from "../pages/AddMovie";
import MovieDetails from "../pages/MovieDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SEARCH} element={<Search />} />
      <Route path={ROUTES.ADD} element={<AddMovie />} />
      <Route path={ROUTES.DETAILS()} element={<MovieDetails />} />
      <Route path="*" element={<div className="p-6">404 - Not Found</div>} />
    </Routes>
  );
}