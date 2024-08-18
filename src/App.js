import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import PeopleDirectory from "./pages/PeopleDirectory";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/people" element={<PeopleDirectory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
