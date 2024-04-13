import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
  RouterProvider
} from "react-router-dom";
import "./App.css";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider
} from "@web3modal/ethereum";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureChains, createClient } from "wagmi";
import { getCollectionByAddress } from "./api/collectionApi";
import { getNftCall, getNftErc1155Call } from "./api/nftApi";
import AuthWrapper from "./components/authWrapper";
import Footer from "./components/layout/Footer";
import PageStatistics from "./components/Statistics";
import Page404 from "./pages/404/404";
import AccountPage from "./pages/Account/Account";
import CollectionDetails from "./pages/CollectionDetails";
import CollectionSettings from "./pages/collectionSettings/collectionSettings";
import Creation from "./pages/Creation";
import CreateCollection from "./pages/Creation/CreateCollection";
import CreateSingleNft from "./pages/Creation/CreateSingleNft";
import ImportCollection from "./pages/Creation/ImportCollection";
import Explorer from "./pages/Explorer";
import Home from "./pages/Home";
import Inscription from './pages/Inscription/Inscription';
import MintLimited from "./pages/mintLimited/mintLimited";
import MyNftDetails from "./pages/myNftDetails";
import ProfileWrapper from "./pages/Profile/ProfileWrapper";
import { store } from "./redux/store";
import { fxgChain } from "./utils/chains/chains";

import { Web3Modal } from "@web3modal/react";

import { WagmiConfig } from "wagmi";
import Header from "./components/layout/Header";

const chains = [fxgChain];
// Wagmi client
export const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: "c713aa69c46302aa2ce0353d8b67b8fa",
  }),
]);

const wagmiClient = createClient({
  logger: {
    warn: (message) => console.log(message),
  },
  autoConnect: true,
  connectors: [...modalConnectors({ appName: "web3Modal", chains })],
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
        path="drops"
        element={
          <>
            <MintLimited />
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
        path="inscription"
        element={
          <>
            <Inscription />
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
        loader={async ({ params }) => {
          const getCollectionPromise = getCollectionByAddress(
            params.collectionAddress
          );

          return defer({
            dataPromise: getCollectionPromise,
          });
        }}
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
        loader={async ({ params }) => {
          const getCollectionPromise = getCollectionByAddress(
            params.collectionAddress
          );
          return defer({
            dataPromise: getCollectionPromise,
          });
        }}
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
        loader={async ({ params, request }) => {
          console.log("***********************")
          const isErc1155 = new URL(request.url).searchParams.get('isErc1155');
          const {collectionAddress, tokenID} = params;

          let getNFTPromise;
          
          if(isErc1155 && isErc1155 === 'true') {
            getNFTPromise = getNftCall(collectionAddress, tokenID);
          } else {
            getNFTPromise = getNftCall(
              collectionAddress,
              tokenID
            );
          }
          
          
          const getCollectionPromise = getCollectionByAddress(
            collectionAddress
          );

          return defer({
            dataPromise: Promise.all([getNFTPromise, getCollectionPromise]),
          });
        }}
        element={
          <>
            <MyNftDetails />
            <Footer />
          </>
        }
      />
      // 404 page
      <Route
        path="*"
        element={
          <>
            <Page404 />
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
          <RouterProvider router={router} />
        </Provider>
      </WagmiConfig>

      <Web3Modal
        projectId="c713aa69c46302aa2ce0353d8b67b8fa"
        ethereumClient={ethereumClient}
        themeZIndex={1000000}
        themeColor="orange"
        themeMode="dark"
      />

    <ToastContainer />
    </>
  );
}

export default App;
