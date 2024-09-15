export function validateEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  }
  
  export function validatePassword(pass) {
    return pass.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)!=null;
  }
  
  export function capitalize(name) {
    const str_arr = name.split(' ');
    for(let i = 0; i < str_arr.length; i++){
        str_arr[i] = str_arr[i][0].toUpperCase() + str_arr[i].slice(1)
    }
    return str_arr.join(' ')
  }