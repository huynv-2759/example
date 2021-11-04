import axios from 'axios'
export default function ({ store, redirect, token }) {
  // If the user is not authenticated
  const nameEQ = "token_authen=";
  const ca = document.cookie.split(';');
  for(const i=0;i < ca.length; this.i++) {
    const c = ca[i];
    while (c.charAt(0)===' ') this.c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) {
      token = c.substring(nameEQ.length,c.length);
    }
  }
  axios.get(`http://127.0.0.1:8000/api/get-user-infomation`, {
    headers: {'Authorization': token}
  })
  .then(response => {
    if(response.data.status === 0 && response.data.code === 502){
      redirect ('/login')
    }

  })
  .catch(e => {
    this.errors.push(e)
  })

}
