import React from 'react'
import pic_demo from '../media/headphone7.jpg';
import classes from './Product_card_small.module.css';
const Product_card_small = props => {
     return (
          <div className={`${classes.wrap} m-5 hover:shadow-xl aspect-square w-[15%] h-auto overflow-hidden group'`}>
               <img src={props.product_data.image_path_1 || pic_demo} className='aspect-square object-cover w-full h-auto' />
               <div className='w-full bg-black h-6 relative text-white translate-y-[-100%]'>
                    <h2 className={`${classes.animated} text-base h-full w-[100vw] absolute`}>{props.product_data.name}</h2>
                    <span className=' text-base ml-2 absolute h-full bg-black right-0 w-1/2 button-0'>NT {props.product_data.price.toLocaleString()}</span>
               </div>
          </div>
     )
}

export default Product_card_small