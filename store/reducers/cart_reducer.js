const { createSlice } = require("@reduxjs/toolkit");
const { allCartItems, addItemToCart, updateCartItem, deleteCartItem, deleteCartItems } = require("../actions/cart_actions");



const cartSlice =   createSlice({
    name : "cart_item",
    initialState : {
        cart_items : [],
        status : "idle",
        error : null
    },
    reducers  :  {
        cartItems : (state, action) => {
            state.cart_items.push(action.payload)
        },
        newCartItem : (state, action) => {
            state.cart_items.push(action.payload)
        }
    },
    extraReducers (builder) {
        builder
        .addCase(allCartItems.pending, (state, action) => {
            state.status = "pending"
        })
        .addCase(allCartItems.fulfilled, (state, action) => {
            state.status = "succeeded",
            state.cart_items = action.payload
        })
        .addCase(allCartItems.rejected, (state,action) => {
            state.status = "failed",
            state.error =  action.error.message
        })
        .addCase(addItemToCart.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(addItemToCart.fulfilled, (state, action)  => {
            state.status = "succeeded",
            state.cart_items  =  action.payload
        })
        .addCase(addItemToCart.rejected, (state, action) =>  {
            state.status = "failed",
            state.error  =  action.error.message
        })
        .addCase(updateCartItem.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(updateCartItem.fulfilled, (state, action) => {
            state.status = "succeeded",
            state.cart_items= action.payload
        })
        .addCase(updateCartItem.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        .addCase(deleteCartItem.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.status = "succeeded",
            state.cart_items= action.payload
        })
        .addCase(deleteCartItem.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        .addCase(deleteCartItems.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(deleteCartItems.fulfilled, (state, action) => {
            state.status = "succeeded",
            state.cart_items= action.payload
        })
        .addCase(deleteCartItems.rejected, (state, action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})

export const  {cartItems, newCartItem}  =  cartSlice.actions

export default  cartSlice.reducer;