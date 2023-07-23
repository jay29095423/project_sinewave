import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useCookies } from 'react-cookie';
import { BsFillEyeFill, BsFillEyeSlashFill,  BsLine, BsTwitter } from 'react-icons/bs'
import GoogleLoginButton from './GoogleLoginButton';

import axios from 'axios';
import Login_register from './login_register';
const Backdrop = props => {
     return (
          <div className=' w-screen top-0 h-[100vh] fixed z-20 bg-black bg-opacity-75' onClick={props.onClick}></div>
     )
}

const Login_box = props => {
     return (


          <div className={`${props.className}  bg-white z-30 fixed w-[30%] left-[35%] top-[20vh]  `}>

               {props.children}

          </div>
     )
};

const rootElement = document.getElementById('overlay-root');

const Login = props => {
     const [account, set_account] = useState('');
     const account_change = event => {
          set_account(x => event.target.value);
     };
     const [password, set_password] = useState('');
     const password_change = event => {
          set_password(x => event.target.value);
     }
     const [cookies, setCookie] = useCookies([]);

     const expirationDate = new Date();
     expirationDate.setDate(expirationDate.getDate() + 7); // 設定為7天後過期


     const login_submit = async event => {
          event.preventDefault();


          let data = {
               account: account,
               password: password,
              
          }

          var results = await axios.post('http://localhost:5500/login', data);
          if (results.data === '帳號或密碼錯誤') {
               alert('帳號或密碼錯誤');
          } else {

               setCookie('user_data', results.data, { path: '/', expires: expirationDate });
               props.cancel();

          }

     };

     useEffect(() => {
          console.log(cookies);
     }, [cookies]);

     useEffect(() => {
          console.log(cookies); // 初次渲染時手動輸出一次
     }, []);

     const [password_vis, set_password_vis] = useState(false);
     const password_vis_handler = () => {
          set_password_vis(x => !x);
     };
     const [account_focus, set_account_focus] = useState(false);
     const [password_focus, set_password_focus] = useState(false);
     const account_style_change = () => {
          set_account_focus(x => !x)
     }
     const password_style_change = () => {
          set_password_focus(x => !x)
     }
     const [show_register, set_show_register] = useState(false)
     const show_register_hanlder = () => {
          set_show_register(x => !x)
     }
     const render_login_or_register = () => {
          if (show_register === true) {
               return (<Login_register cancel={show_register_hanlder} />)
          } else {
               return (<form className='p-2' onSubmit={login_submit}>
                    <h2 className='text-2xl font-bold p-2'>會員登入</h2>
                    <hr className='mb-2' />
                    <label htmlFor='account' className='mx-2 text-xl font-bold w-full block' >電子郵件</label>
                    <div className={`w-full p-2 h-full ${account_focus ? 'bg-red-200' : ''} `}>
                         <input id='account' onChange={account_change} value={account} onFocus={account_style_change} onBlur={account_style_change} className={`w-[90%] border-2  rounded p-1 `} />
                    </div>
                    <label htmlFor='password' className='mx-2 text-xl font-bold w-full block'>密碼</label>

                    <div className={`w-full p-2 h-full ${password_focus ? 'bg-red-200' : ''} `}>
                         <input type={password_vis ? 'account' : 'password'} onChange={password_change} value={password} onFocus={password_style_change} onBlur={password_style_change} className='w-[90%]  border-2 rounded p-1' />
                         <button type='button' className=' ml-2 p-1 rounded ' onClick={password_vis_handler}>
                              {password_vis ?
                                   <BsFillEyeSlashFill className='text-gray-500' /> :
                                   <BsFillEyeFill className='text-gray-500' />
                              }
                         </button>
                    </div>
                    <button type='button' onClick={show_register_hanlder} className='p-2 block w-full text-blue-800 underline'>註冊帳號</button>
                    <hr />
                    <h2 className='text-xl font-bold p-2'>用社群帳號登入</h2>
                    <div className=' w-full items-center flex justify-evenly p-5'>
                       
                         <button type='button' className='hover:border-gray-300  rounded-full  items-center flex justify-center text-center text-2xl text-yellow-500'>  
                         <GoogleLoginButton cancel={props.cancel} />
                         </button>
                         <button type='button' className='hover:border-gray-300 border rounded-full p-2 items-center flex justify-center text-center text-2xl text-blue-400'>
                               <BsTwitter />
                               </button>
                         <button type='button' className='hover:border-gray-300 border rounded-full p-2 items-center flex justify-center text-center text-2xl text-green-500'>
                               <BsLine />
                               </button>

                    </div>

                    <hr className='mb-5' />
                    <div className='p-2 flex  justify-evenly'>
                         <button type='button' className='text-2xl bg-gray-300 p-2 font-bold hover:bg-gray-500' onClick={props.cancel}>取消</button>
                         <button type='submit' className='text-2xl bg-red-300 p-2 font-bold hover:bg-red-500' >登入</button>
                    </div>
               </form>)
          }

     }
     return (

          <>
               {ReactDOM.createPortal((<Backdrop onClick={show_register ? props.no : props.cancel} ></Backdrop>), rootElement)}
               {ReactDOM.createPortal(
                    <Login_box className={props.className} >
                         <h2 className='bg-black  text-xl p-2 text-red-400'>Sine Wave</h2>
                         {render_login_or_register()}

                    </Login_box>, rootElement)}
          </>
     )
}

export default Login