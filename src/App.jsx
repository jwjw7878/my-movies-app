import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundpage from "./pages/NotFoundpage/NotFoundpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default App;
