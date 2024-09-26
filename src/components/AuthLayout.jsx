import React, {useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication = true}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authentication, navigate, authStatus])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
