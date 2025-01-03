const API_KEY = "AIzaSyBYW53tFnKyVT5MP3eGGNO7ptrZ0IXpgHY"


import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export function SignUp(){
<GoogleOAuthProvider clientId= "299875729531-bo76d5icl6tuqqtc74d65j7hugoa2lrc.apps.googleusercontent.com">



<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
</GoogleOAuthProvider>
}
