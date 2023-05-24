import { configureStore } from '@reduxjs/toolkit'

import users from './reducers/user_reducer';
import laundry from './reducers/laundry_reducer'
import category from './reducers/category_reducer';

export default configureStore({

    reducer : {
        users,
        laundry,
        category
    }
})