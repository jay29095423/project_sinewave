import React, { useState } from 'react'
import { BsExclamationCircle, BsGoogle, BsLine, BsTwitter } from 'react-icons/bs'
import axios from 'axios';
import Email_vertify from './email_vertify';

const Login_register = props => {

     const [show_hint, set_show_hint] = useState(false);

     const show_hint_handler = () => {
          set_show_hint(true)
          setTimeout(() => { set_show_hint(false) }, 3000)
     }

     const [email, set_email] = useState('');
     const [email_valid, set_email_valid] = useState('ini');
     const email_change_handler = event => {
          set_email(event.target.value);

          const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          set_email_valid(email_regex.test(email))
     }

     const email_valid_style = () => {

          if (email_valid === 'ini') {
               return ''
          } else if (email_valid === false) {
               return 'border-red-500'
          } else { return 'border-green-600' }

     }

     const [password, set_password] = useState('');
     const [password_valid, set_password_valid] = useState('ini');
     const password_change_handler = event => {
          set_password(event.target.value);

          const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

          set_password_valid(password_regex.test(password))
     }

     const password_valid_style = () => {

          if (password_valid === 'ini') {
               return ''
          } else if (password_valid === false) {

               return 'border-red-500'
          } else { return 'border-green-600' }

     }

     const [password_2, set_password_2] = useState('');
     const [password_2_valid, set_password_2_valid] = useState('ini');
     const password_2_change_handler = event => {
          set_password_2(event.target.value);

          const password_2_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

          // console.log(password === event.target.value && password_2_regex.test(password_2))

          if (password_2_regex.test(event.target.value) && password === event.target.value) {

               set_password_2_valid(true)

          } else {
               set_password_2_valid(false);
          }

     }

     const password_2_valid_style = () => {

          if (password_2_valid === 'ini') {
               return ''
          } else if (password_2_valid === false) {
               return 'border-red-500'
          } else { return 'border-green-600' }

     }
     const [email_vertify, set_email_vertify] = useState(false)
    
     const register_submit = async event => {
          event.preventDefault();
          if (email_valid && password_valid && password_2_valid) {

               let data = {
                    email: email,
                    password: password,
               }

               const results = await axios.post('http://localhost:5500/register', data)
               if (results.data.errno === 1062) {
                    alert('帳號已存在')
               } else if (results.data.affectedRows === 1) {


                   
                    alert('註冊成功');
                    set_email_vertify(true);
               }

          }

     }

     const render_email_validfy = () => {

          if (email_vertify) {

               return (
                    <Email_vertify email={email} />
               )

          } else {

               return (
                    <form className='p-2' onSubmit={register_submit}>
                         <h2 className='text-2xl font-bold p-2'>會員註冊</h2>
                         <hr className='mb-2' />
                         <label htmlFor='account' className='mx-2 text-xl font-bold w-full block' >請輸入電子郵件</label>
                         <div className={`w-full p-2 h-full  `}>
                              <input id='account' value={email} onChange={email_change_handler} type='email' className={`${email_valid_style()} w-[90%] border-2  rounded p-1 `} required />
                         </div>
                         <label htmlFor='password' className='mx-2 text-xl font-bold w-full block'>密碼</label>

                         <div className={`w-full p-2 h-full  `}>
                              <input value={password} onChange={password_change_handler} className={`${password_valid_style()} w-[90%]  border-2 rounded p-1`} id='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$' required type='password' />
                              <span onMouseEnter={show_hint_handler} className='group ml-2 text-lg text-gray-500 relative rounded inline-block'>
                                   <BsExclamationCircle className='pt-[2px]' />
                                   <div className={`${show_hint ? 'opacity-90' : 'opacity-0'} duration-200 absolute text-black text-sm w-[10vw] border bg-gray-200 shadow-lg top-7 rounded p-1 font-bold`}>請輸入至少8個字元且包含大小寫英文及至少一個數字</div>
                              </span>
                         </div>
                         <label htmlFor='password-2' className='mx-2 text-xl font-bold w-full block'>確認密碼</label>

                         <div className={`w-full p-2 h-full  `}>
                              <input value={password_2} onChange={password_2_change_handler} className={`${password_2_valid_style()} w-[90%]  border-2 rounded p-1`} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$' required type='password' />

                         </div>


                         <hr />
                         <h2 className='text-xl font-bold p-2'>用社群帳號註冊</h2>
                         <div className=' w-full items-center flex justify-evenly p-5'>

                              <button type='button' className='hover:border-gray-300 border border-transparent rounded-full p-2 items-center flex justify-center text-center text-2xl text-yellow-500'> <BsGoogle /></button>
                              <button type='button' className='hover:border-gray-300 border border-transparent rounded-full p-2 items-center flex justify-center text-center text-2xl text-blue-400'> <BsTwitter /></button>
                              <button type='button' className='hover:border-gray-300 border border-transparent rounded-full p-2 items-center flex justify-center text-center text-2xl text-green-500'> <BsLine /></button>

                         </div>

                         <hr className='mb-5' />
                         <div className='p-2 flex  justify-evenly'>
                              <button onClick={props.cancel} type='button' className='text-2xl bg-gray-300 p-2 font-bold hover:bg-gray-500' >取消</button>
                              <button type='submit' className='text-2xl bg-red-300 p-2 font-bold hover:bg-red-500' >送出</button>
                         </div>
                    </form>)

          }

     }

     return (
          render_email_validfy()
     )
}

export default Login_register