const ItemCounter = ({ count, setCount }) => {
  return (
    <div>
      <p className="itemCountText">Item Count</p>
      <div className="itemCounter">
        <button disabled={count === 1} onClick={() => setCount(count - 1)}>
          -
        </button>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
};

export default ItemCounter;
