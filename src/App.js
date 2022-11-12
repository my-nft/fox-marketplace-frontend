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
import Footer from "./components/layout/Footer";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Header />}>
    <Route path="" element={<><Home /><Footer/></>} />
  </Route>
));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
