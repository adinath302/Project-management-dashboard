import React, { useContext, useEffect, useState } from 'react'
import Product_card from './Product_card.jsx'
import Product_Data from './Product_data.jsx'
import './Manage_product.css'
import ProductForm from './ProductForm.jsx'
import ProductDetails from './ProductDetails.jsx'
import { Outlet } from 'react-router-dom'
import ProductAddform from './ProductAddform.jsx'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
// import { AppContext } from './useContext.jsx'
import { useDispatch, useStore } from './ProductProvider.jsx'
const Product_list = () => {

  // const { data, setData } = useContext(AppContext)
  // const [editingProduct, setEditingProduct] = useState(null) // to store the product which was being edited by the user
  // const [showAdd, setShowAdd] = useState(false)
  // console.log("editingProduct",editingProduct) 
  const { Product: productData } = useStore() //accesing the product data from the globle state store
  const dispatch = useDispatch()

  return (
    <AnimatePresence mode='wait'>
      <motion.main
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, y: -100 }}
        className='color'
      >
        <div className='flex items-center p-3'>
          <div
            onClick={() => dispatch({ type: "ADD_FORM", payload: true })} // IT WILL MAKE THE Show_Add_from - true to show the add form 
            className='px-3 py-1 font-semibold cursor-pointer select-none bg-[#2c92c3] rounded-xl flex items-center justify-center'
          >
            Add Product
          </div>
        </div>
        <div className='grid gap-3 p-3'>
          <div className='grid grid-cols-4 font-semibold p-2 rounded-xl bg-[#105c98] text-white'>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Actions</div>
          </div>
          {Array.isArray(productData) && productData.length > 0 ? productData.map(item => (
            <Product_card
              key={item.id}
              product={item}
            // onEdit={HandleEditClick}
            // handledelete={handledelete}
            // HandleView={HandleView}
            />
          )) :
            // if the data is empty then show this in the screen 
            <div className='text-center text-2xl font-semibold flex items-center justify-center h-screen'>data not found</div>
          }
        </div>
        <div>
          <Outlet />
        </div>
      </motion.main>
    </AnimatePresence>
  )
}

export default Product_list
