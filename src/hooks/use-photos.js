import react, {useState, useEffect, useContext} from "react";
import userContext from "../context/user";
import { getUserId } from "../services/firebase";
import { getPhotos } from '../services/firebase'
export default function usePhotos() {
    const [photos, setPhotos] = useState(null)
    const {user: {uid: userId=''}} = useContext(userContext)

    useEffect(() => {
        async function getTimelinePhotos() {
            const [ user ] = await getUserId(userId)
            let followedUserPhotos = []
           

           if(user.following.length > 0) {
            followedUserPhotos = await getPhotos(userId, user.following)
            } 
            followedUserPhotos = followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated)
            setPhotos(followedUserPhotos)

        }
        getTimelinePhotos();
        
       
    }, [])

    return {photos}
}