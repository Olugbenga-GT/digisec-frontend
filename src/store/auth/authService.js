import axios from 'axios'

const BASE_URL= 'https://agile-ravine-89696.herokuapp.com';


// const Register / Sign Up

const register = async (userData) => {
    const response = await axios.post(BASE_URL+'/user' , userData , {
        headers : {
            'content-type': 'application/json'
          }
    })

    if(response.data){
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}
 
const login = async (userData) => {
    const response = await axios.post('to-the-desired-url' , userData)

    if(response.data){
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}


// LOGOUT
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register, 
    login,
    logout,
}

export default authService ; 