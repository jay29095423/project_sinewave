import React, { useState } from 'react'
import Chart from "react-apexcharts";
import { IoIosStarHalf, IoIosStarOutline, IoIosStar } from "react-icons/io";
import classes from './member_outcome.module.css'
import Member_year_chart from './member_year_chart';
import { useEffect } from 'react';
import { useMemo } from 'react';

const Member_outcome = props => {
     const [item_data, set_item_data] = useState(props.item_data)

     let complete_items = item_data.filter(value => value.online === 3)

     const get_revenue = array => {     //傳入陣列篩選出總收益

          let total_revenue = 0;

          for (let i = 0; i < array.length; i++) {
               total_revenue += array[i].price;

          };

          return total_revenue;

     }


     let order_complete_number = complete_items.length;

     let order_total_number = item_data.length;

     let order_complete_rate = (order_complete_number / order_total_number).toFixed(1) * 100 + '%';

     const filter_item_by_year = (status, year) => {  //把全部完成的物品依據年份過濾
          if (status === 'complete') {
               return complete_items.filter(item => {

                    let date = new Date(item.updated_at)

                    return date.getFullYear() === year;

               });
          } else {
               return item_data.filter(item => {

                    let date = new Date(item.created_at)

                    return date.getFullYear() === year;


               })
          }

     }



     //各年度物品的陣列
     let items_array = {

          2023: {
               complete: filter_item_by_year('complete', 2023),
               all: filter_item_by_year('all', 2023),
          },
          2022: {
               complete: filter_item_by_year('complete', 2022),
               all: filter_item_by_year('all', 2022),
          },
          2021: {
               complete: filter_item_by_year('complete', 2021),
               all: filter_item_by_year('all', 2021),
          },
          2020: {
               complete: filter_item_by_year('complete', 2020),
               all: filter_item_by_year('all', 2020),
          },
          2019: {
               complete: filter_item_by_year('complete', 2019),
               all: filter_item_by_year('all', 2019),
          },
          total: {
               complete: complete_items,
               all: item_data
          },

     }

     const get_rate_by_stars = stars => {

          let array = props.order_data.filter(val => {
               // console.log(val.rate_stars);
               return val.rate_stars === +stars
          })

          return array
     }

     // console.log(get_rate_by_stars(4))

     const revenue_by_month = year_array => {
          let temp_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          year_array.map((val) => {
               // console.log(prev.updated_at);
               let month = new Date(val.updated_at).getMonth();
               temp_array[month] = temp_array[month] + val.price;
          });

          return temp_array
     };
     const order_number_by_month = year_array => {
          let temp_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          year_array.map((val) => {
               let month = new Date(val.updated_at).getMonth();
               temp_array[month] = temp_array[month] + 1;
          });

          return temp_array
     }

     const outcome_data = {
          total_price: get_revenue(complete_items),
          order_complete_number: order_complete_number,
          order_total_number: order_total_number,
          order_complete_rate: order_complete_rate,
          order_number_by_month: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          Annual_total_price: get_revenue(items_array[2023].complete),
          last_total_price: get_revenue(items_array[2022].complete),
          rev_2023: revenue_by_month(items_array[2023].complete),
          rev_2022: revenue_by_month(items_array[2022].complete),
          rev_2021: revenue_by_month(items_array[2021].complete),
          rev_2020: revenue_by_month(items_array[2020].complete),
          rev_2019: revenue_by_month(items_array[2019].complete),
          com_2023: order_number_by_month(items_array[2023].complete),
          com_2022: order_number_by_month(items_array[2022].complete),
          com_2021: order_number_by_month(items_array[2021].complete),
          com_2020: order_number_by_month(items_array[2020].complete),
          com_2019: order_number_by_month(items_array[2019].complete),
          review_5: get_rate_by_stars(5).length,
          review_4: get_rate_by_stars(4).length,
          review_3: get_rate_by_stars(3).length,
          review_2: get_rate_by_stars(2).length,
          review_1: get_rate_by_stars(1).length,

     };


     var total_review_rate = (outcome_data.review_5 * 5) + (outcome_data.review_4 * 4) + (outcome_data.review_3 * 3) + (outcome_data.review_2 * 2) + (outcome_data.review_1 * 1)
     var total_complete_order_number = outcome_data.review_5 + outcome_data.review_4 + outcome_data.review_3 + outcome_data.review_2 + outcome_data.review_1;
     var total_review_star = (total_review_rate / total_complete_order_number).toFixed(1);


     var review_class;
     var review_text;
     if (total_review_star >= 4.5) {
          review_class = 'text-red-500';
          review_text = '優良';
     } else if (total_review_star >= 4) {
          review_class = 'text-orange-500';
          review_text = '良好';
     } else if (total_review_star >= 3) {
          review_class = 'text-green-700';
          review_text = '普通';
     } else if (total_review_star >= 2) {
          review_class = 'text-blue-700';
          review_text = '尚可';
     } else {

          review_class = 'text-red-900';
          review_text = '不佳';
     }

     const [total_chart, set_total_chart] = useState({
          options: {
               responsive: [
                    {
                         breakpoint: 1653,
                         options: {
                              title: {
                                   offsetX: -44,
                                   offsetY: 115,
                                   style: { fontSize: '23px', },
                              },
                         },
                    },
                    {
                         breakpoint: 1610,
                         options: {
                              title: {
                                   offsetX: -44,
                                   offsetY: 110,
                                   style: { fontSize: '20px', },
                              },
                         },
                    },
                    {
                         breakpoint: 1510,
                         options: {
                              title: {
                                   offsetX: -40,
                                   offsetY: 99,
                                   style: { fontSize: '17px', },
                              },
                         },
                    },
                    {
                         breakpoint: 1380,
                         options: {
                              title: {
                                   offsetX: -40,
                                   offsetY: 86,
                                   style: { fontSize: '14px', },
                              },
                         },
                    },
                    {
                         breakpoint: 1276,
                         options: {
                              title: {
                                   offsetX: -40,
                                   offsetY: 75,
                                   style: { fontSize: '12px', },
                              },
                         },
                    },
                    {
                         breakpoint: 1200,
                         options: {
                              title: {
                                   offsetX: -40,
                                   offsetY: 70,
                                   style: { fontSize: '12px', },
                              },
                         },
                    }
               ],
               colors: ['#C30A0A', '#ccc'],
               title: {
                    text: '訂單完成率',
                    align: 'center',
                    margin: 10,
                    offsetX: -44,
                    offsetY: 125,
                    floating: false,
                    style: {
                         fontSize: '25px',
                         fontWeight: 'bold',
                         fontFamily: undefined,
                         color: '#000'
                    },

               },
               labels: ['已完成', '未完成',],
               dataLabels: {
                    enabled: false,
               }
          },
          series: [

               outcome_data.order_complete_number, outcome_data.order_total_number - outcome_data.order_complete_number,
          ]

     }
     );

     const [review_chart, set_review_chart] = useState({
          options: {
               chart: {
                    id: "basic-bar"
               },
               xaxis: {
                    categories: ['五星', '四星', '三星', '二星', '一星']
               },
               plotOptions: {
                    bar: {
                         horizontal: true,
                         borderRadius: 4,
                         columnWidth: '70%',
                    }
               },
               colors: ['#C40909'],  // 設定長條圖的顏色
          },
          series: [
               {
                    name: "評價數",
                    data: [outcome_data.review_5, outcome_data.review_4, outcome_data.review_3, outcome_data.review_2, outcome_data.review_1]
               }
          ],
     }
     )
useEffect(()=>{
     set_review_chart(x=>x)
})
     const g_r = ((outcome_data.Annual_total_price - outcome_data.last_total_price || 0) / outcome_data.last_total_price) * 100;

     var gr_class;


     if (g_r > 0) {
          gr_class = 'text-red-700';
     } else {
          gr_class = 'text-green-700'
     }

     const render_review_star = () => {

          if (total_review_star === 5) {
               return <>
                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>

               </>
          } else if (total_review_star >= 4.5) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarHalf className='inline-block text-red-400 mb-2'></IoIosStarHalf>

               </>
          } else if (total_review_star >= 4) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 3.5) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarHalf className='inline-block text-red-400 mb-2'></IoIosStarHalf>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 3) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 2.5) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarHalf className='inline-block text-red-400 mb-2'></IoIosStarHalf>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 2) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStar className='inline-block text-red-400 mb-2'></IoIosStar>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 1.5) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStarHalf className='inline-block text-red-400 mb-2'></IoIosStarHalf>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          } else if (total_review_star >= 1) {
               return <>

                    <IoIosStar className='inline-block text-red-400 mb-2 ml-1'></IoIosStar>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>
                    <IoIosStarOutline className='inline-block text-red-400 mb-2'></IoIosStarOutline>

               </>
          }

     }

     return (
          <div className='w-full border bg-gray-100'>
               <h1 className='text-2xl bg-red-300 p-2 font-bold '>統計資料</h1>
               <div className='w-full flex flex-warp'>
                    <div className=' relative p-5 w-1/3 bg-gray-100 hover:shadow-lg inline-block'>
                         <Chart
                              options={total_chart.options}
                              series={total_chart.series}

                              type="donut"
                              width="100%"
                         />
                         <div className={`${classes['custom-style']} font-extrabold text-red-700 absolute`}>{outcome_data.order_complete_rate}</div>
                    </div>
                    <div className='w-1/3 inline-block bg-gray-100 p-2 hover:shadow-lg'>
                         <h2 className='text-2xl font-bold p-2'>總收益 : <span className='text-red-700'>NT {outcome_data.total_price.toLocaleString()}</span></h2>
                         <hr />
                         <h2 className='text-xl font-bold p-2'>總商品數 : <span> {outcome_data.order_total_number}</span></h2>
                         <h2 className='text-xl font-bold p-2'>訂單完成數 : <span> {outcome_data.order_complete_number}</span></h2>
                         <h2 className='text-xl font-bold p-2'>訂單完成率 : <span> {outcome_data.order_complete_rate}</span></h2>
                         <h2 className='text-xl font-bold p-2'>本年度收益 : <span className='text-red-700'>NT {outcome_data.Annual_total_price.toLocaleString()}</span></h2>
                         <h2 className='text-xl font-bold p-2'>去年度收益 : <span className='text-red-700'>NT {outcome_data.last_total_price?.toLocaleString() || 0}</span></h2>
                         <h2 className='text-xl font-bold p-2'>成長率 : <span className={`${gr_class}`}> {g_r.toFixed(1)}%</span></h2>

                    </div>
                    <div className='w-1/3 inline-block bg-gray-100 p-2 hover:shadow-lg'>
                         <h2 className='text-2xl font-bold p-2'>總評價 :
                              {render_review_star()}

                              <span className='text-red-700 ml-1'>

                                   ({total_review_star})</span></h2>
                         <hr />
                         <div >
                              <Chart
                                   options={review_chart.options}
                                   series={review_chart.series}
                                   type="bar"
                                   width="100%"
                                   className='block'
                              />
                         </div>

                         <h2 className='text-xl font-bold p-2'>綜合評價 : <span className={`${review_class}`}> {review_text}</span></h2>
                    </div>

               </div>
               <div className='w-full flex flex-warp'>

                    <Member_year_chart data={outcome_data} items_array={items_array} get_revenue={get_revenue} />
               </div>


          </div>
     )
}

export default Member_outcome