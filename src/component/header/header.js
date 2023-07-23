import React, { useContext, useEffect, useState } from 'react';

import logo from '../media/sineWave.png';

import { RiUserLine, RiHandbagLine, RiShoppingCartLine } from "react-icons/ri";

import { IoIosSunny, IoMdMoon } from "react-icons/io";
import Cart from '../cart/cart';
import cart_context from '../store/cart_context';
import { useCookies } from 'react-cookie';
import Login from './login';
import { Link } from 'react-router-dom';

const Header = () => {
     const [cookies, removeCookies] = useCookies();

     const [active_cart, set_active_cart] = useState(false);

     const [cart_bump, set_cart_bump] = useState(false);
     const cart_data = useContext(cart_context);

     useEffect(() => {

          if (cart_data.items.length === 0) {
               return
          }

          set_cart_bump(true);

          const timer = setTimeout(() => {
               set_cart_bump(false);
          }, 200)

          return (() => {
               clearTimeout(timer)
          })

     }, [cart_data.items.length])


     var cart_number = cart_data.items.reduce((accumulator, item) => {
          return accumulator + +item.amount;
     }, 0);

     const showCart = () => {
          set_active_cart(x => !x)
     }
     const [show_login, set_show_login] = useState(false);
     const [show_member, set_show_member] = useState(false);
     const toggle_login = () => {


          if (cookies.user_data==='undefined') {
              set_show_login(true);
          } else { 
                set_show_member(x=>!x);
           }



     }
     // const render_login = () => {
     //      if (cookies)
     // }

     const logout = () => {
          removeCookies('user_data');
          window.location.href='http://localhost:3000/';
     }
     const check_login = () => {
          set_show_member(false);
          console.log(cookies)
     }
     
     return (
          <>
               {show_login ? <Login cancel={()=>{ set_show_login(false)}} /> : ''}

               <header className='z-50 w-full h-16 fixed right-0 top-0'>
                    {show_member ? <div className='absolute z-10 right-5 top-20 rounded bg-gray-200'>
                         <button onClick={check_login} className='border m-2 w-[120px] hover:bg-red-400 bg-red-300 font-bold text-xl'>
                             <Link to='/member'> 會員中心</Link> 
                              </button>
                         <button onClick={logout} className='border m-2 w-[120px] hover:bg-red-400 bg-red-300 font-bold text-xl'>登出</button>
                    </div> : ''}
                    <div className='h-full bg-black relative'>
                         <Link to='/' className='h-full w-1/6  inline-block'>
                              <img src={logo} className='h-full pl-8 py-3 object-contain' alt='LOGO' />

                         </Link>
                         <div className=' absolute right-0 w-96 h-full top-0 flex'>
                              <div className='h-full w-20  flex justify-center items-center' >
                                   <IoIosSunny className='text-3xl text-white hover:text-red-400' />
                              </div>
                              <button onClick={showCart} className=' flex justify-center items-center relative group right-0 h-full w-1/3 '>
                                   <RiShoppingCartLine className={`group-hover:text-red-400 group-active:text-red-800 text-white text-4xl ${cart_bump ? 'scale-125' : ''}`} />
                                   {cart_number ? <span className={` absolute left-16 bottom-2 text-gray-50 h-4 w-4 text-xs rounded-full block ${cart_bump ? 'scale-125' : ''}  bg-red-500 `}>{cart_number}</span> : ''}
                              </button>
                              <Link to='/product' className=' flex justify-center items-center relative group right-0 h-full w-1/3'>
                                   <RiHandbagLine className='group-hover:text-red-400 group-active:text-red-800 text-white text-4xl' />
                              </Link>
                              <button onClick={toggle_login} className=' flex justify-center items-center relative group right-0 h-full w-1/3'>
                                   <RiUserLine className='group-hover:text-red-400 group-active:text-red-800 text-white text-4xl' />
                                   <span className=' absolute left-14 bottom-2 text-gray-50 h-4 w-4 text-xs rounded-full block bg-red-500 '></span>


                              </button>
                         </div>
                    </div>
               </header >
               {active_cart ? <Cart showCart={showCart} /> : ''
               }
          </>
     )
}

export default Header