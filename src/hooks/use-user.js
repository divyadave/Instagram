import {useState, useEffect, useContext} from 'react'
import userContext from '../context/user'
import { getUserId } from '../services/firebase'


export default function useUser () {
    const [activeUser, setUser] = useState({})
    const { user } = useContext(userContext)

    useEffect(() => {
        async function getUserIdfromFirestore() {
            const [response] = await getUserId(user.uid)
           
            setUser(response)

        }
        if(user?.uid) {
            getUserIdfromFirestore();
        }

    },[user])

  

    return { user: activeUser }

}