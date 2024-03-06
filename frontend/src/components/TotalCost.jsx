import React, { useState,useEffect  } from "react";
import { useSelector } from "react-redux";

function TotalCost() {
  const [totalCost, setTotalCost] = useState(0);
  const basketSlice = useSelector((state) => state.basketSlice);
  useEffect(() => {
    const cost = basketSlice.basket.reduce((accumulator, item, i) => {
      const price = item.price * basketSlice.order.goodsReadyToBuy[i].count;
      return accumulator + price;
    }, 0);

    setTotalCost(cost);
  }, [basketSlice]);
  return <div style={{ color: "black" }}>Total cost: {totalCost}</div>;
}

export default TotalCost;
