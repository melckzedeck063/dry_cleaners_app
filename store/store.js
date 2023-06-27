import { configureStore } from '@reduxjs/toolkit'

import users from './reducers/user_reducer';
import laundry from './reducers/laundry_reducer'
import category from './reducers/category_reducer';
import service   from './reducers/service_reducer';
import notification from './reducers/notification_reducer';
import  cart_items from './reducers/cart_reducer';
import order from './reducers/order_reducer'
export default configureStore({

    reducer : {
        users,
        laundry,
        category,
        service,
        notification,
        cart_items,
        order
    }
})