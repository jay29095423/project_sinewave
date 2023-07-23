import React from 'react';
import guitar from '../media/guitar.jpg'
import { FaAngleDoubleRight } from "react-icons/fa";

const News_card =props => {
     return (
          <div className='group flex justify-center w-full h-[100px] relative my-2 cursor-pointer hover:h-[120px] hover:shadow-xl hover:border duration-200'>



               <div className='w-1/5 h-full inline-block'>
                    <img className='w-full h-full object-cover' src={props.news.pic} />
               </div>
               <div className='w-4/5 inline-block h-full relative'>
                    <span className=' mt-2 text-xl p-2 font-semibold text-red-700'>{props.news.type}</span>
                    <h1 className='text-3xl p-2 font-extrabold  '>{props.news.title}</h1>
                    <h5 className=' text-lg absolute right-0 bottom-12 font-semibold text-transparent group-hover:text-red-700 duration-300'>看更多</h5>
               </div>

               <span className='text-3xl text-transparent group-hover:text-red-600 p-10 duration-150'>
                    <FaAngleDoubleRight />
               </span>

          </div>
     )
}

export default News_card