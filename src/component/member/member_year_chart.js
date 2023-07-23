import React, { useState } from 'react'
import Chart from "react-apexcharts";
import Download_excel from './download_excel';
import { useEffect } from 'react';


const Member_year_chart = props => {
     const [year_revenue_chart, set_year_revenue_chart] = useState({
          options: {
               dataLabels: {
                    enabled: false,
               },
               chart: {
                    id: "basic-bar"
               },
               xaxis: {
                    categories: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
               },
               title: {
                    text: '每月成交金額',
                    align: 'left',
                    margin: 30,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                         fontSize: '18px',
                         fontWeight: 'bold',
                         fontFamily: undefined,
                         color: '#263238'
                    },
               },
               colors: ['#F87171'],
          },
          series: [
               {
                    name: "當月成交金額",
                    data: props.data.rev_2023
               }
          ],
     }
     )

     const [year_complete_chart, set_year_complete_chart] = useState({
          options: {
               dataLabels: {
                    enabled: true,
                    style: {
                         fontSize: '12px',
                         colors: ['#333']
                    },
                    background: {
                         enabled: true,

                         padding: 6,
                         borderRadius: 2,
                         borderWidth: 1,
                         borderColor: '#fff',
                         opacity: 0.9,
                         dropShadow: {
                              enabled: false,
                              top: 1,
                              left: 1,
                              blur: 1,
                              color: '#000',
                              opacity: 0.45
                         }
                    },
               },
               chart: {
                    id: "basic-line"
               },
               xaxis: {
                    categories: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
               },
               title: {
                    text: '每月訂單完成數',
                    align: 'left',
                    margin: 30,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                         fontSize: '18px',
                         fontWeight: 'bold',
                         fontFamily: undefined,
                         color: '#263238'
                    },
               },
               colors: ['#C40909'],  // 設定長條圖的顏色
          },
          series: [
               {
                    name: "當月完成訂單",
                    data: props.data.com_2023
               }
          ],
     }
     )

     const [selected_year, set_selected_year] = useState(2023);
     const [total_items, set_total_items] = useState(0) //賣場商品總數
     const [annual_revenue, set_annual_revenue] = useState(0)
     const [last_year_revenue, set_last_year_revenue] = useState(0)
     const [yearly_new_item, set_yearly_new_item] = useState(0)
     const [yearly_com_item, set_yearly_com_item] = useState(0)
     // console.log(props.items_array.total.all)
     const get_order_complete_within_year = year => {
          let array = props.items_array.total.all.filter((val) => {
               // console.log(new Date(val.created_at).getFullYear)
               return new Date(val.created_at).getFullYear() === year && new Date(val.updated_at).getFullYear() === year;
          });
          return array;
     }


     const render_yearly_data = year => {
          let total;
          switch (+year) {
               case 2023:
                    total = props.items_array[2023].all.length
                         + props.items_array[2022].all.length
                         + props.items_array[2021].all.length
                         + props.items_array[2020].all.length
                         + props.items_array[2019].all.length
                    break;

               case 2022:
                    total = props.items_array[2022].all.length
                         + props.items_array[2021].all.length
                         + props.items_array[2020].all.length
                         + props.items_array[2019].all.length
                    break;
               case 2021:
                    total = props.items_array[2021].all.length
                         + props.items_array[2020].all.length
                         + props.items_array[2019].all.length
                    break;
               case 2020:
                    total = props.items_array[2020].all.length
                         + props.items_array[2019].all.length
                    break;
               case 2019:
                    total = props.items_array[2019].all.length
                    break;
               default:
                    break;
          };

          let y_revenue = props.get_revenue(props.items_array[year].complete).toLocaleString()
          set_annual_revenue(y_revenue);

          let l_y_revenue = props.get_revenue(props.items_array[+year - 1]?.complete || 0).toLocaleString()
          set_last_year_revenue(l_y_revenue);

          set_yearly_new_item(props.items_array[year].all.length);

          set_yearly_com_item(get_order_complete_within_year(+year).length)

          set_total_items(total);
     }

     useEffect(() => { render_yearly_data(selected_year) }, [])

     const select_year_hanlder = event => {

          set_selected_year(event.target.value);
          set_year_complete_chart(x => { return { ...x, series: [{ data: props.data[`com_${event.target.value}`] }] } })
          set_year_revenue_chart(x => { return { ...x, series: [{ data: props.data[`rev_${event.target.value}`] }] } })
          render_yearly_data(event.target.value);
     };


     return (
          <div className='hover:shadow-xl w-full flex flex-wrap' >
               <div className='border bg-red-300 w-full'>

                    <label htmlFor='year' className=' relative w-full inline-block text-2xl p-2 font-bold mr-1'>年度統計資料
                         <div className='text-base inline-block absolute right-4'>
                              <select id='year' className=' p-1 mx-2 rounded' onChange={select_year_hanlder}>
                                   <option value={2023}>2023</option>
                                   <option value={2022}>2022</option>
                                   <option value={2021}>2021</option>
                                   <option value={2020}>2020</option>
                                   <option value={2019}>2019</option>
                              </select>

                              <Download_excel className='rounded  p-1 text-sm font-bold bg-orange-100 hover:bg-orange-200' />

                         </div>

                    </label>

               </div>
               <div className='w-1/3 hover:shadow-lg'>
                    <Chart
                         options={year_complete_chart.options}
                         series={year_complete_chart.series}
                         type="line"
                         width="100%"
                    /></div>


               <div className='w-1/3 hover:shadow-lg'>
                    <Chart
                         options={year_revenue_chart.options}
                         series={year_revenue_chart.series}
                         type="bar"
                         width="100%"
                    />
               </div>

               <div className='w-1/3 inline-block p-2 hover:shadow-lg'>
                    <h1 className='px-2 font-bold text-xl'>{selected_year}年統計資料</h1>
                    <hr />
                    <h2 className='text-lg font-bold p-2'>賣場總商品數 : <span> {total_items}</span></h2>
                    <h2 className='text-lg font-bold p-2'>新上架數 : <span> {yearly_new_item}</span></h2>
                    <h2 className='text-lg font-bold p-2'>新上架完成數 : <span> {yearly_com_item}</span></h2>
                    <h2 className='text-lg font-bold p-2'>本年度收益 : <span className='text-red-700'>NT {annual_revenue}</span></h2>
                    <h2 className='text-lg font-bold p-2'>去年度收益 : <span className='text-red-700'>NT {last_year_revenue}</span></h2>

               </div>
          </div>

     )
}

export default Member_year_chart