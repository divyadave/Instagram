import { useReducer, useEffect } from "react";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";


export default function UserProfile ({user}) {
    const reducer = (state, newState) => ({...state, ...newState})
    const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
}
    const [{profile,photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        async function getProfileInfoAndPhotos () {
            const photos = await getUserPhotosByUsername(user.username);
            console.log(photos)
            dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})  
        }
        if(user.username)
        {
            getProfileInfoAndPhotos();
        }
       
    }, [user, user.username])

    return (
        <div>
            <Header photosCount={photosCollection ? photosCollection.length : 0} profile={profile} followerCount={followerCount} setFollowerCount={dispatch}></Header>
        <Photos photos={photosCollection}></Photos>
        </div>
    )


}