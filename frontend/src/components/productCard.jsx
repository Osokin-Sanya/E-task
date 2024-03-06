import { useDispatch, useSelector } from "react-redux";
import { addProduct, getBasketItems } from "../redux/sliceBasket";
import { Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

function ProductCard({ name, price, productId, product }) {
  const dispatch = useDispatch();

  const basketItems = useSelector(getBasketItems);
  const isActive = basketItems.some((item) => item?._id === productId);

  const handleButtonClick = () => {
    dispatch(addProduct(product));
  };

  return (
    <Card
      className={isActive ? "chosen" : ""}
      style={{
        width: 160,
        margin: 15,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <div> {price} грн </div>,
        <ShoppingCartOutlined key="key" onClick={handleButtonClick} />,
      ]}
    >
      <Meta title={name} description="This is the description" />
    </Card>
  );
}

export default ProductCard;
