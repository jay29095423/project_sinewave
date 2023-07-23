import React, { useEffect, useState } from 'react';

import CarouselCard from '../UI/carousel_card';



const Carousel =props => {

     const news_data = props.news_data

     const [news_select, set_news_select] = useState(2);
     const [news_content, set_news_content] = useState(news_data[0]);

     const selected_dot = 'cursor-pointer inline-block m-2 bg-red-900 w-2 h-2';
     const unselected_dot = 'cursor-pointer inline-block m-2 bg-red-600 w-2 h-2';

     const [dot_0, set_dot_0] = useState(unselected_dot);
     const [dot_1, set_dot_1] = useState(selected_dot);
     const [dot_2, set_dot_2] = useState(unselected_dot);
     const [dot_3, set_dot_3] = useState(unselected_dot);
     const [dot_4, set_dot_4] = useState(unselected_dot);


     const change_news = x => {

          set_news_select(x)

     }


     useEffect(() => {

          // alert('change')
          set_news_content(() => news_data[news_select]);
          switch (news_select) {
               case 0:

                    set_dot_0(selected_dot);
                    set_dot_1(unselected_dot)
                    set_dot_2(unselected_dot)
                    set_dot_3(unselected_dot)
                    set_dot_4(unselected_dot)

                    break;
               case 1:

                    set_dot_1(selected_dot);
                    set_dot_0(unselected_dot)
                    set_dot_2(unselected_dot)
                    set_dot_3(unselected_dot)
                    set_dot_4(unselected_dot)

                    break;
               case 2:

                    set_dot_2(selected_dot);
                    set_dot_1(unselected_dot)
                    set_dot_0(unselected_dot)
                    set_dot_3(unselected_dot)
                    set_dot_4(unselected_dot)

                    break;
               case 3:

                    set_dot_3(selected_dot);
                    set_dot_1(unselected_dot)
                    set_dot_2(unselected_dot)
                    set_dot_0(unselected_dot)
                    set_dot_4(unselected_dot)

                    break;
               case 4:

                    set_dot_4(selected_dot);
                    set_dot_1(unselected_dot)
                    set_dot_2(unselected_dot)
                    set_dot_3(unselected_dot)
                    set_dot_0(unselected_dot)

                    break;

               default:

                    set_dot_2(selected_dot);
                    set_dot_1(unselected_dot)
                    set_dot_0(unselected_dot)
                    set_dot_3(unselected_dot)
                    set_dot_4(unselected_dot)

                    break;
          }

     }, [news_select]);

     useEffect(() => {

          const timer = setInterval(() => {

               set_news_select(x => {

                    if (x < 4) {
                         return x + 1
                    } else {
                         return 0
                    }

               })

          }, 5000);

          return () => {

               clearInterval(timer); // 清除定時器
          };

     }, []);

     return (
          <div className='items-center justify-center flex flex-col w-full'>
               <CarouselCard news={news_content} />
               <div className='mt-6 '>

                    <span onClick={() => { change_news(0) }} className={dot_0}></span>
                    <span onClick={() => { change_news(1) }} className={dot_1}></span>
                    <span onClick={() => { change_news(2) }} className={dot_2}></span>
                    <span onClick={() => { change_news(3) }} className={dot_3}></span>
                    <span onClick={() => { change_news(4) }} className={dot_4}></span>

               </div>
          </div>

     )
}

export default Carousel


