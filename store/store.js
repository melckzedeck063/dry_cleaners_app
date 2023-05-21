import { configureStore } from '@reduxjs/toolkit'

import users from './reducers/user_reducer';

export default configureStore({

    reducer : {
        users
    }
})