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
import Creation from "./pages/Creation";
import CreateSingleNft from "./pages/Creation/CreateSingleNft";
import CreateCollection from "./pages/Creation/CreateCollection";
import ImportCollection from "./pages/Creation/ImportCollection";
import Profile from "./pages/Profile";
import Explorer from "./pages/Explorer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route
        path=""
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="creation"
        element={
          <>
            <Creation />
            <Footer />
          </>
        }
      />
      <Route
        path="single-nft"
        element={
          <>
            <CreateSingleNft />
            <Footer />
          </>
        }
      />
      <Route
        path="create-collection"
        element={
          <>
            <CreateCollection />
            <Footer />
          </>
        }
      />
      <Route
        path="import-collection"
        element={
          <>
            <ImportCollection />
            <Footer />
          </>
        }
      />
      <Route
        path="profile"
        element={
          <>
            <Profile />
            <Footer />
          </>
        }
      />

       <Route
        path="explorer"
        element={
          <>
            <Explorer />
            <Footer />
          </>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
