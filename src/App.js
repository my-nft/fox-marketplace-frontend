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
import { store } from "./redux/store";
import AuthWrapper from "./components/authWrapper";
import ProfileWrapper from "./pages/Profile/ProfileWrapper";
import MyNftDetails from "./pages/myNftDetails";
import AccountPage from "./pages/Account/Account";
import ConfirmationPopup from "./components/confirmationPopup/confirmationPopup";
import DatePicker from "./components/datePicker/datePicker";
import CollectionSettings from "./pages/collectionSettings/collectionSettings";
import PageStatistics from "./components/Statistics";

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
        path="/account"
        element={
          <>
            <AccountPage />
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
        path="collection/:collectionAddress"
        exact
        element={
          <>
            <CollectionDetails />
            <Footer />
          </>
        }
      />
      <Route
        path="collection/:collectionAddress/settings"
        exact
        element={
          <>
            <CollectionSettings />
            <Footer />
          </>
        }
      />

      {/*  NOT my NFT  */}
      <Route
        path="collection/:collectionAddress/:tokenID"
        exact
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
      <PageStatistics />
      {/*
      <ConfirmationPopup
        title="Test"
        message="KLMOASDASDASDAsd adwqe adwa dwqe q"
      />
        */}

      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
