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
import CollectionSettings from "./pages/collectionSettings/collectionSettings";
import PageStatistics from "./components/Statistics";
import { fxgChain } from "./utils/fxgChain";
import { ethers, providers } from "ethers";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { createClient, configureChains } from 'wagmi'


import { Web3Modal } from "@web3modal/react";

import { WagmiConfig } from "wagmi";



const chains=[fxgChain]
// Wagmi client
export const { provider } = configureChains(chains, [
  walletConnectProvider({ 
    projectId: "c713aa69c46302aa2ce0353d8b67b8fa",  
  })
]);


const wagmiClient = createClient({
  logger: {
    warn: (message) => console.log(message),
  },
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

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
          <AuthWrapper>
            <AccountPage />
            <Footer />
          </AuthWrapper>
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
        path="explore"
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
    <>
      <WagmiConfig client={wagmiClient}>
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
      </WagmiConfig>

      <Web3Modal
        projectId="c713aa69c46302aa2ce0353d8b67b8fa"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
