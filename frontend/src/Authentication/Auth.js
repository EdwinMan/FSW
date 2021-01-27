import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'

export default function Auth() {


    const [isLogin, setIslogin] = useState(true)

    function Switch(){
        setIslogin(isLogin => !isLogin)
        }

    return  isLogin ? <Login Switch={Switch}/> : <Register Switch={Switch}/>


}
