import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import React from "react";

const FoxRoutes = 
  <Route path="/"
    element={
        <Header />
    }
  >
    <Route path="/home" element={<Home />} />
  </Route>;

const router = createBrowserRouter(createRoutesFromElements(FoxRoutes));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
