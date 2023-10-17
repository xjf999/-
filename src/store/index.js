import { createStore } from 'vuex'

const setCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getCartList = () => {
  return JSON.parse(localStorage.cartList) || {}
}

export default createStore({
  state: {
    cartList: {} || getCartList()
  },
  getters: {
  },
  mutations: {
    addItemToCart (state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += payload.num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      setCartList(state)
    },
    checkIcon (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
      setCartList(state)
    },
    cleanCart (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
      setCartList(state)
    },
    cartChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = !product.check
        }
      }
      setCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
