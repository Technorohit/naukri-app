// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    console.log(userStr)
    if (!!userStr) 
    return JSON.parse(userStr)
    else return false;
  }
export let UserExist = false;
  // remove the user from the session storage
  export const removeUserSession = () => {
    UserExist = false;
    sessionStorage.removeItem('user');
  }
   
  // set user in the session storage
  export const setUserSession = (user) => {
    UserExist = true;
    if(user){
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }