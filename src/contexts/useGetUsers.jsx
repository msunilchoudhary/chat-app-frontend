import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

function useGetUsers() {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(()=>{
        const getUsers = async () =>{
            setLoading(true)
            try {
                const token = Cookies.get("token");

                const response = await axios.get("/api/user/",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    Credentials:true
                })

                setAllUsers(response.data)
                setLoading(false)
                
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    },[])
  return [allUsers, loading]
}

export default useGetUsers