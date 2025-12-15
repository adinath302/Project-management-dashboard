import { AnimatePresence } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useDispatch } from './ProductProvider.jsx'
const ProductForm = () => {
  // console.log('product', product)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const dispatch = useDispatch() // consume the dispatch function

  const newData = {
    id: Date.now(),
    name: name,
    price: Number(price),
    stock: Number(stock),
  }

  // console.log('newData', newData)

  const handlesave = e => {
    e.preventDefault()
    dispatch({
      type: "ADD", payload: {
        value: false,
        data: newData,
      }
    })
    setName('')
    setStock('')
    setPrice('')
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div className='flex flex-col p-3 bg-gray-200 rounded-xl '>
        <h1 className='font-bold flex items-center justify-center text-xl mb-5'>
          Edit Product
        </h1>
        <form action='' onSubmit={handlesave} className='gap-2 flex flex-col'>
          <label htmlFor='' className=''>
            name :
            <input
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Product name'
              className='px-2 py-1 text-sm rounded-md bg-white '
            />
          </label>
          <label htmlFor=''>
            Price:
            <input
              type='number'
              name='price'
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder='Product price'
              className='px-2 py-1 text-sm rounded-md bg-white '
            />
          </label>
          <label htmlFor=''>
            Stock:
            <input
              type='number'
              name='stock'
              value={stock}
              onChange={e => setStock(e.target.value)}
              placeholder='Product stock'
              className='px-2 py-1 text-sm rounded-md bg-white '
            />
          </label>
          <button
            type='submit'
            className=' mt-3 py-2 px-3 bg-gray-400 font-semibold rounded-2xl hover:scale-102 transition-all'
          >
            Save
          </button>
          <button
            type='button'
            onClick={() => dispatch({ type: 'CLOSEFORMADD', payload: false })}
            className='py-2 px-3 bg-gray-400 font-semibold rounded-2xl hover:scale-102 transition-all'
          >
            Cancel
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductForm
