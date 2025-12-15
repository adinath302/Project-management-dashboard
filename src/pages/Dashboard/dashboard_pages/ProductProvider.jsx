import { Children, createContext, useContext, useReducer, useState } from 'react';
import Product_data from './Product_data.jsx'
import { useReducedMotion } from 'motion/react';
import React from 'react';
import ProductDetails from './ProductDetails.jsx';
import ProductForm from './ProductForm.jsx';
import ProductAddform from './ProductAddform.jsx';
export const initialProductState = {
    Product: Product_data,
    ViewProduct: null, // Add this to track the selected product
    EDIT_PRODUCT: null, //t0 edit the product 
    ShowAddfrom: false,
}
console.log("initial-Data ", initialProductState.ShowAddfrom)

// define the reducer function
const storeReducer = (state, action) => { // the state and the action
    console.log("action payload - ", action.payload)
    switch (action.type) {
        case "ADD":
            const { value, data } = action.payload;
            return {
                ...state,
                Product: [...state.Product, data],
                ShowAddfrom: value
            }
        case 'VIEW':
            return {
                ...state,
                ViewProduct: action.payload
            }
        case 'CLOSE':
            return {
                ...state,
                ViewProduct: null
            }
        case 'DELETE':
            return {
                ...state,
                Product: [...state.Product.filter(item => item.id !== action.payload.id)],
            }
        case 'EDIT':
            return {
                ...state, EDIT_PRODUCT: action.payload,
            }
        case "SAVE-EDIT":
            return {
                ...state, Product: [...state.Product.map(item => item.id === action.payload.id ? action.payload : item)], // update the product after varifiying the id 
                EDIT_PRODUCT: null // it will close after form is saved 
            }
        case 'Close_Product_Edit_form':
            return {
                ...state,
                EDIT_PRODUCT: null // to cancel the edit form
            }
        case 'ADD_FORM':
            return {
                ...state,
                ShowAddfrom: action.payload,
            }
        case 'CLOSEFORMADD':
            return {
                ...state,
                ShowAddfrom: action.payload
            }
        default:
            return state; // Always return state if action doesn't match
    }
}

// create the context (separate contexts for state and dispatch are a performance optimization)
const StoreContext = React.createContext(initialProductState);

const StoredDispatchContext = createContext(null);
// Custom hook to consume the state
export const useStore = () => useContext(StoreContext)

// custom hook to consume the dispatch fuction
export const useDispatch = () => useContext(StoredDispatchContext)

// the provider conponent that wraps the app
export const StoreProvider = ({ children }) => {
    // define the initial state and the dispatch function 
    const [state, dispatch] = useReducer(storeReducer, initialProductState);

    return (
        <StoreContext.Provider value={state}>
            <StoredDispatchContext.Provider value={dispatch}>
                {children}
                {
                    state.ViewProduct && (
                        // to view the product
                        <div className='fixed  inset-0 z-50 items-center justify-center  bg-black/40 backdrop-blur-sm'>
                            <div className='items-center flex justify-center h-screen'>
                                <ProductDetails
                                    product={state.ViewProduct}
                                    HandleCloseView={() => dispatch({ type: 'CLOSE' })}
                                />
                            </div>
                        </div>
                    )
                },
                {
                    state.EDIT_PRODUCT && (
                        <div className='bg-[url(https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center fixed z-50 bg-black/40 backdrop-blur-xl  h-screen inset-0 '>
                            {/* Pass the product data and the save/close handlers to the form */}
                            <div className='flex items-center justify-center h-screen'>
                                <ProductForm
                                    product={state.EDIT_PRODUCT}
                                />
                            </div>
                        </div>
                    )
                },
                {
                    state.ShowAddfrom && (
                        <div className='bg-[url(https://images.unsplash.com/photo-1486520299386-6d106b22014b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center backdrop-blur-sm inset-0 z-50 fixed bg-black/40 '>
                            <div className='flex items-center justify-center h-screen'>
                                <ProductAddform />
                            </div>
                        </div>
                    )
                }
            </StoredDispatchContext.Provider>
        </StoreContext.Provider >
    )
}