import React from "react";
import { Card, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, increment, decrement } from "../redux/sliceBasket";

const { Meta } = Card;

function CartItemCard({ name, price, productId }) {
  const dispatch = useDispatch();

  const backetItem = useSelector(
    (state) => state.basketSlice.order.goodsReadyToBuy
  );
  const selectedBacketProduct = backetItem.find(
    (item) => item.productId === productId
  );
  const countProduct = selectedBacketProduct.count;

  function incrementCountProduct() {
    dispatch(increment(productId));
  }

  function decrementCountProduct() {
    dispatch(decrement(productId));
  }

  function removeItem() {
    dispatch(removeItemFromCart(productId));
  }

  return (
    <>
      <Card
        style={{
          width: 175,
          margin: 15,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <div> {price * countProduct} грн </div>,

          <Space key={productId}>
            <div>
              <input
                disabled
                type="number"
                min={1}
                max={100}
                value={countProduct}
                className="inputCount"
              />
              <button onClick={incrementCountProduct}>+</button>
              <button onClick={decrementCountProduct}>-</button>
            </div>
          </Space>,
          <DeleteOutlined onClick={removeItem} className="DeleteOut lined" />,
        ]}
      >
        <Meta title={name} description="This is the description" />
      </Card>
    </>
  );
}

export default CartItemCard;
