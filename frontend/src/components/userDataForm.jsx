import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, Space } from "antd";

import { getAddress, setUserAddress, getOrder } from "../redux/sliceBasket";
import TotalCost from "./TotalCost";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 80,
      }}
    >
      <Option value="380">+380</Option>
    </Select>
  </Form.Item>
);

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const UserDataForm = ({ setUserData }) => {
  const address = useSelector(getAddress);
  const order = useSelector(getOrder);

  const dispatch = useDispatch();
  const [streetValue, setStreetValue] = useState(
    address ? address.display_name : ""
  );

  const onFinish = (values) => {
    setUserData(values);
    dispatch(setUserAddress(streetValue));
  };

  useEffect(() => {
    if (address && address.display_name) {
      setStreetValue(address.display_name);
    }
  }, [address]);

  useEffect(() => {
    if (order.userData && Object.keys(order.userData).length > 0) {
      alert(JSON.stringify(order));
    }
  }, [order.userData]);

  return (
    <div
      style={{
        pointerEvents: order.goodsReadyToBuy == 0 ? "none" : "auto",
      }}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 324,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            rules={[{ required: true }]}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Address">
          <Space.Compact
            style={{
              alignItems: "flex-start",
            }}
          >
            <Form.Item
              name={["address", "countries"]}
              rules={[
                {
                  required: true,
                  message: "countries is required",
                },
              ]}
            >
              <Select placeholder="Select countries">
                <Option value="Ukraine">Ukraine</Option>
              </Select>
            </Form.Item>
            <input
              style={{
                width: "345px",
                padding: "7px",
              }}
              type="text"
              value={streetValue}
              onChange={(e) => setStreetValue(e.target.value)}
            />
          </Space.Compact>
        </Form.Item>

        <TotalCost />
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDataForm;
