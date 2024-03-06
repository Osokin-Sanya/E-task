import React from "react";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { ShoppingOutlined } from "@ant-design/icons";
import { getBasketItems } from "../redux/sliceBasket";

function BadgeBasket() {
  const items = useSelector(getBasketItems);

  return (
    <Badge count={items.length} offset={[1, 10]}>
      <ShoppingOutlined style={{ fontSize: 33 }} />
    </Badge>
  );
}

export default BadgeBasket;
