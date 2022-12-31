const ActivityItem = ({id}) => {
    return (
        <tr id={"item_" + id }>
            <td>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </td>
            <td>
              <img
                src="./assets/images/nft_test.jpg"
                id={"nft_" + id}
                className="imgIconItemNft"
              />
              <span>Name of Nft</span>
            </td>
            <td className="tableItemPrice">
              <p>0.01 FXG</p>
              <span className="p-0">$21,24</span>
            </td>
            <td>1</td>
            <td>address from</td>
            <td>address to</td>
            <td>2 day ago</td>
          </tr>
    );
}

export default ActivityItem;