import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useCookies } from 'react-cookie';
const Backdrop = props => {
     return (
          <div className=' w-screen h-[100vh] fixed top-0 z-20 bg-black bg-opacity-75' onClick={props.cancel}></div>
     )
}

const PasswordChangeBox = props => {
     return (


          <div className={`${props.className} bg-white z-30 fixed w-[25%] left-[37.5%] top-[20vh]  `}>

               {props.children}

          </div>
     )
};

const rootElement = document.getElementById('overlay-root');

const Member_data_password_change = props => {
     const [cookies, removeCookies] = useCookies();
     const [new_password_valid, set_new_password_valid] = useState(null)
     const [new_password, set_new_password] = useState('');
     const [new_password_comfirm, set_new_password_comfirm] = useState('');

     const new_password_change_handler = event => {
          set_new_password(event.target.value);
          const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
          set_new_password_valid(password_regex.test(new_password) && new_password === new_password_comfirm)

     }
     const new_password_comfirm_change_handler = event => {

          set_new_password_valid(new_password === event.target.value);
          // console.log(new_password_valid)

          set_new_password_comfirm(event.target.value);

     };

     const render_valid_color = () => {
          if (new_password_valid === true) {
               return 'border-green-500 border';
          } else if (new_password_valid === false) {
               return 'border-red-300 border bg-red-200';
          } else {
               return 'border border-gray-600';
          }
     };

     const new_passeord_submit = async evnet => {
          evnet.preventDefault();

          if (new_password_valid === true) {

               let results = await axios.put('http://localhost:5500/user_password_updated', { id: props.id, new_password: new_password })
               console.log(results)

               if (results.data.affectedRows === 1) {
                    alert('更新完成，請用新密碼重新登入');
                    removeCookies('user_data');
                    window.location.href='http://localhost:3000/';
               }

          }


     }

     return (
          <>
               {ReactDOM.createPortal((<Backdrop cancel={props.cancel} ></Backdrop>), rootElement)}
               {ReactDOM.createPortal(
                    <PasswordChangeBox className={props.className} >
                         <form onSubmit={new_passeord_submit}>
                              <h1 className='w-full bg-red-600 text-white text-2xl p-1 font-semibold '>密碼變更</h1>
                              <label className='p-2 block w-full font-bold text-lg' htmlFor='newPassword'>新密碼</label>
                              <input className={`p-2 block w-[80%] ${render_valid_color()} rounded m-2`} id='newPassword' type='password' placeholder='請輸入新密碼' value={new_password} onChange={new_password_change_handler} />
                              <label className='p-2 block w-full font-bold text-lg' htmlFor='newPasswordComfirm'>新密碼確認</label>
                              <input className={`p-2 block w-[80%] ${render_valid_color()} rounded m-2`} id='newPasswordComfirm' type='password' placeholder='請再次輸入新密碼' value={new_password_comfirm} onChange={new_password_comfirm_change_handler} />
                              <div className='w-full mt-10 flex items-center justify-center'>
                                   <button className='font-lg font-bold  p-2 block bg-gray-500  w-[20%] rounded m-2' type='button' onClick={props.cancel} >取消</button>
                                   <input className='font-lg font-bold  p-2 block bg-red-500  w-[20%] rounded m-2' type='submit' />
                              </div>
                         </form>
                    </PasswordChangeBox>, rootElement)}
          </>
     )
}

export default Member_data_password_change