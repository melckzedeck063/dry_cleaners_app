import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories, registerCategory } from "../actions/category_action";


const  CategorySlice =  createSlice({
    name :  'category',
    initialState  : {
        categories :  [],
        category :  null,
        current_category  :  null,
        status : "",
        message : '',
        error :  ''
    },
    reducers : {
        newCategory : (state,action) => {
            state.category.push(action.payload)
        },
        allCategories :  (state,action) => {
            state.categories.push(action.payload)
        },
        currentCategory : (state,action) => {
            state.current_category.push(action.payload)
        }
    },
    extraReducers  (builder){
        builder
        .addCase(registerCategory.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(registerCategory.fulfilled, (state,action) => {
            state.status = "Succesfull",
            state.category = action.payload,
            state.message ="New category registered succesfull"
        })
        .addCase(registerCategory.rejected, (state,action) => {
            state.status = "Failed",
            state.error  = action.error.message
        })
        .addCase(getAllCategories.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllCategories.fulfilled, (state,action) => {
            state.status = "Succesfull",
            state.categories = action.payload,
            state.message ="categories data found succesfull"
        })
        .addCase(getAllCategories.rejected, (state,action) => {
            state.status = "Failed",
            state.error  = action.error.message
        })
    }
})

export const  {newCategory,allCategories,currentCategory}  = CategorySlice.actions;

export default CategorySlice.reducer