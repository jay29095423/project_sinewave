import React from 'react';
import classes from './item_card.module.css';
import Button from './Button';
import { useState } from 'react';
import { useContext } from 'react';
import cart_context from '../store/cart_context';
import Color_option from './color_option';


const Item_card = props => {

  // console.log(props.product)

  const instock = 20;

  const cart_data = useContext(cart_context);

  const colors = props.product.options;

  const [selectedColors, setSelectedColors] = useState(new Array(colors?.length).fill(false));

  const color_change = index => {

    const updated_color = selectedColors.map((selected, i) => i === index);

    setSelectedColors(updated_color);
  }
  const render_color_option = () => {
    if (props.product.options[0] !== null) {
      return <>
        {props.product.options.map((val, ind) => {
          var x;
          switch (val) {
            case 'black':
              x = "bg-black border-gray-200"
              break;

            case 'green':
              x = 'bg-green-600'
              break;
            case 'red':
              x = 'bg-red-600'
              break;
            case 'pink':
              x = 'bg-red-300'
              break;
            case 'white':
              x = 'bg-white border'
              break;
            case 'blue':
              x = 'bg-blue-600';
              break;
            case 'wood':
              x = 'bg-amber-700';
              break;
            default:
              x = ''
              break;
          }

          return (

            <Color_option
              product={props.product}
              color={x}
              key={ind}
              onChange={() => { color_change(ind) }}
              selected={selectedColors[ind]}
              test={selectedColors}
            />

          )
        })}
      </>
    } else { return }
  }


  const [select_amount, set_select_amount] = useState(0);

  const change_amount = event => {

    set_select_amount(event.target.value);

  }
  const color_selected_english = props.product.options ? props.product.options[selectedColors.findIndex(x => x === true)] : false;

  const submit_handler = event => {
    event.preventDefault();
    let status_data = props.product.status;
    if (props.config) {

      props.config_item(props.product.id)

    } else {

      if (props.product.status === '0') { // 全新
        status_data = false;
        if (select_amount < 1 || select_amount > instock) {

          props.invalid('請輸入有效的值')

          return

        } else if (!color_selected_english) {

          props.invalid('請選擇規格')

          return

        }
      }

      let color_selected;

      switch (color_selected_english) {
        case 'black':
          color_selected = "黑"
          break;

        case 'green':
          color_selected = '綠'
          break;
        case 'wood':
          color_selected = '原木色'
          break;
        case 'red':
          color_selected = '紅'
          break;
        case 'pink':
          color_selected = '粉紅'
          break;
        case 'white':
          color_selected = '白'
          break;

        case 'blue':
          color_selected = '藍'
          break;

        default:
          color_selected = false
          break;
      };

      const used_exit = cart_data.items.findIndex((item) => item.id === props.product.id && props.product.status === item.status);

      if (props.product.status !== '0' && used_exit > -1) {
        props.invalid('商品已存在購物車中');
        return
      }

      cart_data.addItem({

        id: props.product.id,
        price: props.product.price,
        pic: props.product.images[0],
        name: props.product.name,
        option: color_selected,
        amount: select_amount || 1,
        status:status_data,
      });

      setSelectedColors(new Array(colors?.length).fill(false));
      set_select_amount(0);

    }

  }

  const render_online_status = () => {

    switch (props.product.online) {
      case 1:
        return <span className='p-1 rounded-sm absolute top-2 right-2 font-semibold bg-green-200'>已上架</span>

      case 2:
        return <span className='p-1 rounded-sm absolute top-2 right-2 font-semibold text-white bg-red-400'>未上架</span>

      case 3:
        return <span className='p-1 rounded-sm absolute top-2 right-2 font-semibold bg-gray-400'>已完成</span>

      default:
        return
    }


  }

  const render_online_btn = () => {

    switch (props.product.online) {
      case 1:
        return <button type='button' className='p-[2px] h-full font-semibold px-3 ml-2 hover:bg-blue-200  bg-red-300' >下架</button>

      case 2:
        return <button type='button' className='p-[2px] h-full font-semibold px-3 ml-2 hover:bg-blue-200  bg-green-300' >上架</button>

      case 3:
        return

      default:
        return
    }
  }
  const render_edit_btn = () => {
    if (!props.config) {
      return <Button className='inline-block '>+add</Button>
    } else {

      if (props.product.online === 3) {
        return <Button className='inline-block  '>查看</Button>
      } else {
        return <Button className='inline-block  '>編輯</Button>
      }

    }

  }

  const render_status = () => {
    if (props.product.status !== '0') {
      return (<span className='m-2 font-semibold text-red-700 ml-1'>{props.product.status}</span>)
    } else {
      return
    }
  }

  const render_number = () => {
    if (props.product.status === '0') {
      return (<input type='number' className='border border-gray-300 w-10 pl-[4px]' value={select_amount} onChange={change_amount} min={1} max={instock} />)
    } else {
      return
    }
  }

  return (

    <form onSubmit={submit_handler} className={`border cursor-pointer group relative ${props.className} inline-block hover:shadow-lg hover:scale-110 duration-200 hover:z-20 shadow-red-950 overflow-hidden `}>
      <img src={props.product.images[0]} alt='商品圖片' onClick={props.onClick} className='w-full h-[80%] object-cover group-hover:grayscale' />
      {render_online_status()}
      <div onClick={props.onClick} className={`${classes.product_intro} font-semibold text-lg text-transparent p-5 group-hover:text-black w-full h-4/5 absolute top-full group-hover:top-0 group-hover:opacity-90 group-hover:bg-white duration-150`} >
{props.product.description}
      </div>
      <h2 title={props.product.name} className={`text-xl block w-full p-2 bg-white text-black font-bold  ${classes.dotify}`}>{props.product.name}</h2>
      <div className='relative bg-white flex flex-row h-[10%]'>

        <span className='my-2 ml-2 font-bold'>NT {props.product.price.toLocaleString()}</span>
        {render_status()}
        {props.product.options ?
          <div className='flex flex-rol items-center h-full ml-3'>
            {render_color_option()}
          </div> : ''}
        <div className='flex absolute right-0 bottom-1'>

          {render_number()}
          {render_edit_btn()}
          {render_online_btn()}

        </div>
      </div>
    </form >

  )
}






export default Item_card