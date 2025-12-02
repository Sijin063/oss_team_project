import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListPage from "./components/Pages/ListPage";
import DetailPage from "./components/Pages/DetailPage";
import CreatePage from "./components/Pages/CreatePage";
import UpdatePage from "./components/Pages/UpdatePage";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
  
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/update" element={<UpdatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;