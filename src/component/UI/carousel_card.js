import React from 'react'
import Button from './Button';

const CarouselCard = props => {
     return (
          <div className=' items-center justify-center w-3/4 relative h-80 flex border border-gray-100 hover:border-gray-300 hover:shadow-xl duration-500'>

               <div className='h-full  w-1/2 relative px-3 align-middle  justify-center'>
                    <div className='bg-gradient-to-r pb-[2px] from-[#C90A0A] via-[#F45E5E] to-[#Fff]'>
                         <h1 className=' bg-white text-2xl font-bold py-2'>
                              【{props.news.type}】{props.news.title}
                         </h1>
                    </div>
                    <p className=' text-lg py-5 font-semibold'>
                         {props.news.context}
                    </p>
                    <Button className='absolute right-5 bottom-5'>
                         More
                    </Button>
               </div>
               <div className='w-1/2 h-full overflow-hidden'>
                    <img src={props.news.pic} alt='新聞圖片' className='w-full object-cover hover:scale-125 ease-in-out duration-700 h-full' />
               </div>
          </div>
     )
}

export default CarouselCard