import React, { useState, useEffect } from "react";
import { Layout, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { getBasketItems, setUserData } from "../redux/sliceBasket";
import UserDataForm from "../components/userDataForm";
import CartItemCard from "../components/productCardInCart";
import { getGeoLocation } from "../utils/geoLocationExample";
import Map from "../components/map";

import { useGetAddressFromCoordinatesQuery } from "../api/apiMap";
import { setAddress } from "../redux/sliceMapData";
import { useMapContextCustom } from "../utils/Context";

const { Header, Footer, Sider, Content } = Layout;

function Ordering() {
  const dispatch = useDispatch();
  const basketItems = useSelector(getBasketItems);

  const [streetRequired, setStreetRequired] = useState(true);

  const { latlon, setLatLon, setStartInputAddress } = useMapContextCustom();

  const { data } = useGetAddressFromCoordinatesQuery({
    lat: latlon.lat,
    lng: latlon.lng,
  });

  // определяем текущее местоположение пользователя
  useEffect(() => {
    getGeoLocation((error, coordinates) => {
      if (error) {
        console.error("Ошибка получения геолокации:", error);
      } else {
        const { latitude, longitude } = coordinates;
        setLatLon({ lat: latitude, lng: longitude });
        setStartInputAddress(true);
        setStreetRequired(false);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setAddress(data));
  }, [data]);

  const onUserData = (data) => {
    // Отправка данных пользователя в хранилище Redux
    dispatch(setUserData(data));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>Basket</Header>
        <Layout hasSider>
          <Sider width={600} style={siderStyle}>
            <Map setStreetRequired={setStreetRequired} />
            <UserDataForm
              setUserData={onUserData}
              streetRequired={streetRequired}
            />
          </Sider>
          <Content style={contentStyle}>
            {basketItems.map((item) => (
              <CartItemCard
                productId={item._id}
                key={item._id}
                name={item.name}
                price={item.price}
              />
            ))}
          </Content>
        </Layout>
        <Footer style={footerStyle} />
      </Layout>
    </Space>
  );
}

export default Ordering;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#E2F3FF",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
};
const siderStyle = {
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#E2F3FF",
  width: "400px",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
