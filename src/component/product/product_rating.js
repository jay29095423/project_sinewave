import React from 'react'
import Rating from '@mui/material/Rating';
import { useState } from 'react';

const Product_rating = () => {
     const [value, setValue] = useState(5);

     return (

          <div className='flex items-center '>
               <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                         setValue(newValue);
                    }}
               />
               <span className='text-lg font-bold pt-1'>以上</span>
          </div>
     )
}

export default Product_rating