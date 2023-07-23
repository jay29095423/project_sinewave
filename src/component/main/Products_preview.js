import React, { useEffect, useState } from 'react'
import Item_card from '../UI/item_card';
import News_card from '../UI/News_card';
import Button from '../UI/Button';
import headphone from '../media/headphone.jpg';
import headphone2 from '../media/headphone2.jpg';
import headphone3 from '../media/headphone3.jpg';
import headphone4 from '../media/headphone4.jpg';
import headphone5 from '../media/headphone5.jpg';
import headphone6 from '../media/headphone6.jpg';
import headphone7 from '../media/headphone7.jpg';
import headphone8 from '../media/headphone8.jpg';
import MessageBox from '../UI/MessageBox';


const Products_preview = props => {

  const news_data = props.news_data;

  const products = props.product_data

  const sec_products = props.sec_products;

  const [section_selected, set_section_selection] = useState(1);

  const do_select_section = x => {

    set_section_selection(x)

  };

  const render_section = () => {    //改變要查看的內容


    if (section_selected === 1) {
      return (
        <div className='w-full'>
          {news_data.map((val, ind) => {
            return (<News_card news={val} key={val.id} />)
          })}

        </div>
      )

    } else if (section_selected === 2) {

      return (
        <div className='flex-wrap w-full  flex'>
          {products.map((val, ind) => {
            if (ind < 12) {
              return (
                <Item_card invalid={valid_select} product={val} className='w-[24%] h-96 m-[.5%]' key={val.id} />
              )
            }

          })}

        </div>
      )
    } else {
      return (

        <div className='flex-wrap w-full flex'>
          {

            sec_products.map((val, ind) => {
              if (ind < 12) {
                return (
                  <Item_card invalid={valid_select} className='w-[24%] h-96 m-[.5%]' product={val} key={val.id} />
                )
              }
            })
          }


        </div>
      )
    }

  }

  const selected_color = 'border-gray-100 hover:bg-gray-200 hover:text-red-800 w-1/3 inline-block h-full shadow-inner text-2xl font-bold text-red-800 duration-150';
  const none_selected_color = 'border-b border-gray-200 hover:bg-gray-200 hover:text-red-800 w-1/3 inline-block h-full text-2xl font-bold text-red-700 duration-150';
  const [renderClass_1, set_render_class_1] = useState(none_selected_color)
  const [renderClass_2, set_render_class_2] = useState(none_selected_color)
  const [renderClass_3, set_render_class_3] = useState(none_selected_color)

  useEffect(() => {    //改變按鈕的樣式

    if (section_selected === 1) {

      set_render_class_1(selected_color);
      set_render_class_2(none_selected_color);
      set_render_class_3(none_selected_color);

    } else if (section_selected === 2) {

      set_render_class_1(none_selected_color);
      set_render_class_2(selected_color);
      set_render_class_3(none_selected_color);


    } else {
      set_render_class_1(none_selected_color);
      set_render_class_2(none_selected_color);
      set_render_class_3(selected_color);


    }

  }, [section_selected]);

  const [isValid, setIsValid] = useState(true)
  const [invalidMessage, setInvalidMessage] = useState('')

  const valid_select = message => {

    setIsValid(x => !x);

    setInvalidMessage(message ? message : '');

  }

  return (
    <>
      {isValid ? '' : <MessageBox comfirm={valid_select} className=' bg-white'>

        {invalidMessage}

      </MessageBox>}
      <div className='mt-12 flex flex-col items-center w-full h-auto '>
        <div className=' h-auto w-3/4 border border-gray-100'>

          <div className=' relative h-[60px] w-full mb-5 border-t'>

            <button onClick={() => { do_select_section(1) }} className={renderClass_1}>熱門文章</button>
            <button onClick={() => { do_select_section(2) }} className={renderClass_2}>最新商品</button>
            <button onClick={() => { do_select_section(3) }} className={renderClass_3}>二手商品</button>

          </div>
          {render_section()}

        </div>

        <div className='w-[10%] mt-4 bg-gradient-to-tr hover:bg-gradient-to-br p-[2px] from-[#C90A0A] from-20% via-[#fcfcfc] via-70% to-[#C90A0A]  duration-200'>
          <Button className='w-full bg-white duration-150 hover:bg-white group '><p className=' group-active:text-white text-gray-700 m-2 font-semibold text-2xl'>看更多</p></Button>
        </div>

      </div>
    </>

  )
}

export default Products_preview;