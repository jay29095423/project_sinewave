import React from 'react';
import jwtDecode from 'jwt-decode';
import credential from '../../credential/credential';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie'
import axios from 'axios';



const GoogleLoginButton = props => {

     const expirationDate = new Date();
     expirationDate.setDate(expirationDate.getDate() + 7); // 設定為7天後過期

     const [cookies, setCookie] = useCookies([]);
     const handle_callback_response = async (response) => {
          // console.log('encoded JWT ID Token: ' + response.credential);
          var user_object = jwtDecode(response.credential);
          // console.log(user_object)

          const results = await axios.post('http://localhost:5500/google_login', { user_object: user_object })
          // console.log(results)

          if (results.data === '帳號已用其他方式註冊') {
               alert('帳號已用其他方式註冊')
          } else if (results.data) {
               console.log(results.data);
               setCookie('user_data', results.data, { path: '/', expires: expirationDate });
               alert('歡迎 會員:' + results.data.name+`${results.data.new_google_member?' 記得前往會員中心更新資料喔~':''}`)
               props.cancel();
          }
     }


     useEffect(() => {
          /* global google */
          google.accounts.id.initialize({
               client_id: credential.OAuth_2_client_id,
               callback: handle_callback_response
          });
          google.accounts.id.renderButton(
               document.getElementById('signInDiv'),
               { theme: 'outline', size: 'large', type: 'icon', shape: 'circle' }
          )
     }, [])

     return (


          <div id='signInDiv' ></div>

     );
};

export default GoogleLoginButton;