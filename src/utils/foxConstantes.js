export const FIXED_PRICE = "FIXED_PRICE";
export const AUCTION = "AUCTION";

export const FXG_PRICE = 0.0058;
export const FX_PRICE = 0.19001;

// Transactions trace

//PRICE HISTO
export const EVENT_WIN_AUCTION = "EVENT_WIN_AUCTION";
//PRICE HISTO
export const EVENT_BUY_LISTING = "EVENT_BUY_LISTING";
//PRICE HISTO
export const EVENT_ACCEPT_OFFER = "EVENT_ACCEPT_OFFER";

export const EVENT_TRANSFERT_TOKEN = "EVENT_TRANSFERT_TOKEN";

export const EVENT_MAKE_OFFER = "EVENT_MAKE_OFFER";

export const EVENT_PLACE_BID = "EVENT_PLACE_BID";

export const EVENT_LISTING = "EVENT_LISTING";

export const EVENT_DELISTING = "EVENT_DELISTING";

export const EVENT_WITHDRAW_OFFER = "EVENT_WITHDRAW_OFFER";

export const EVENT_REFUND = "EVENT_REFUND";

export const EVENT_CREATE_AUCTION = "EVENT_CREATE_AUCTION";

export const EVENT_ENUM = {
  EVENT_WIN_AUCTION: "Auction won",
  EVENT_BUY_LISTING: "Listing bought",
  EVENT_ACCEPT_OFFER: "Offer accepted",
  EVENT_MAKE_OFFER: "Offer made",
  EVENT_PLACE_BID: "Bid placed",
  EVENT_LISTING: "Listing created",
  EVENT_DELISTING: "Listing deleted",
  EVENT_REFUND: "Refund",
  EVENT_CREATE_AUCTION: "Auction created",
  EVENT_TRANSFERT_TOKEN: "Transfert",
  EVENT_WITHDRAW_OFFER: "Withdraw offer",
};

export const CONTRACT_TYPES = [
  {
    value: "ERC721",
    label: "ERC721",
  },
  {
    value: "ERC1155",
    label: "ERC1155",
  },
];
