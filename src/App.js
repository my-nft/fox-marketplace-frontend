import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Header from "./components/layout/Header";
import React from "react";
import Footer from "./components/layout/Footer";
import Creation from "./pages/Creation";
import CreateSingleNft from "./pages/Creation/CreateSingleNft";
import CreateCollection from "./pages/Creation/CreateCollection";
import ImportCollection from "./pages/Creation/ImportCollection";
import Explorer from "./pages/Explorer";
import CollectionDetails from "./pages/CollectionDetails";
import NftDetails from "./pages/NftDtails";
import { store } from "./redux/store";
import AuthWrapper from "./components/authWrapper";
import ProfileWrapper from "./pages/Profile/ProfileWrapper";
import { ToastContainer } from "react-toastify";
import MyNftDetails from "./pages/myNftDetails";

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
          <AuthWrapper>
            <ProfileWrapper />
            <Footer />
          </AuthWrapper>
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

      <Route
        path="collection"
        element={
          <>
            <CollectionDetails />
            <Footer />
          </>
        }
      />
      {/*  NOT my NFT  */}
      <Route
        path="nft"
        element={
          <>
            <NftDetails />
            <Footer />
          </>
        }
      />

      {/*  NOT my NFT  */}
      <Route
        path="my-nft"
        element={
          <>
            <MyNftDetails />
            <Footer />
          </>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
      />

      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
