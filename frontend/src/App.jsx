import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ProductCard from "./components/productCard";
import BadgeBasket from "./components/badgeBasket";

import { useGetShopsQuery, useGetProductsQuery } from "./api";

const { Header, Sider, Content } = Layout;
const App = () => {
  const dataShops = useGetShopsQuery();
  const dataProducts = useGetProductsQuery();

  const [selectedShopId, setSelectedShopId] = React.useState(null);

  useEffect(() => {
    if (dataShops.data && dataShops.data.length > 0) {
      setSelectedShopId(dataShops.data ? dataShops.data[0]._id : null);
    }
  }, [dataShops]);

  const selectedProducts = dataProducts.data?.filter(
    (product) => product.shopId === selectedShopId
  );

  const onShopClick = (shopId) => {
    setSelectedShopId(shopId);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={dataShops.data?.map((e) => ({ key: e._id, label: e.name }))}
          onClick={(event) => {
            onShopClick(event.key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Link to="/ordering" style={{ transform: "translate(59px, -59px)" }}>
            <BadgeBasket />
          </Link>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className="block-card">
            {selectedProducts?.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                product={product}
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
