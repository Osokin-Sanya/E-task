import { createSlice } from "@reduxjs/toolkit";

const MAX_AMOUNT_OF_PRODUCTS = 20;
const MIN_AMOUNT_OF_PRODUCTS = 1;

function getProductById(state, action) {
  const productId = action.payload;
  return state.order.goodsReadyToBuy.find(
    (item) => item.productId === productId
  );
}

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
    order: {
      goodsReadyToBuy: [],
      userData: [],
    },
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;

      const products = state.basket.find((obj) => obj._id === product._id);
      if (!products) {
        state.basket.push(product); // Добавляем новый продукт в корзину для отрисовки
        state.order.goodsReadyToBuy.push({ productId: product._id, count: 1 }); // Добавляем новый продукт в итоговый массив заказа
      }
    },

    increment(state, action) {
      const product = getProductById(state, action);

      if (!product) return;

      product.count += 1;

      if (product.count > MAX_AMOUNT_OF_PRODUCTS) {
        product.count = MAX_AMOUNT_OF_PRODUCTS;
      }
    },
    decrement(state, action) {
      const product = getProductById(state, action);

      if (!product) return;

      product.count -= 1;

      if (product.count < MIN_AMOUNT_OF_PRODUCTS) {
        product.count = MIN_AMOUNT_OF_PRODUCTS;
      }
    },

    setUserData(state, action) {
      state.order.userData = action.payload;
    },

    removeItemFromCart(state, action) {
      const productId = action.payload;

      state.basket = state.basket.filter((item) => item._id !== productId);
      state.order.goodsReadyToBuy = state.order.goodsReadyToBuy.filter(
        (item) => item.productId !== productId
      );
    },

    setUserAddress(state, action) {
      state.order.userData.address.street = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  addProduct,
  setUserData,
  setDataBasket,
  removeItemFromCart,
  setUserAddress,
} = basketSlice.actions;

export default basketSlice.reducer;

export const getOrder = (state) => state.basketSlice.order;
export const getBasketItems = (state) => state.basketSlice.basket;
export const getAddress = (state) => state.dataMap.address;
