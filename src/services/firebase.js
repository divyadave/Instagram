import {firebase, FieldValue} from '../lib/firebase'

export async function doesUsernameExists(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();
    console.log(result)
    return result.docs.length > 0;
}
export async function getUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id

    }))
   
    return user;  
}
export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get();
    const suggestedData = result.docs.map((item) => (
        {
            ...item.data(),
            docId: item.id
        }

    )).filter((profile) => profile.userId != userId && !following.includes(profile.userId))

    return suggestedData
    
}

export async function updateLoggedInUserFollowing(loggedInDocId, profileId, isFollowingProfile) {
    
    const result = await firebase
    .firestore()
    .collection('users')
    .doc(loggedInDocId)
    .update({
       following: isFollowingProfile ? FieldValue.arrayRemove(profileId): FieldValue.arrayUnion(profileId)

    })
    
}
export async function updateFollowingFollwers(loggedInDocId, profileDocId, isFollowingProfile) {
    
    const result = await firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
       followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInDocId): FieldValue.arrayUnion(loggedInDocId)

    })
    
}
export async function getPhotos(userId, following) {
    
    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

    const userFollowedPhotos = result.docs.map((fphoto) => (
        {
            ...fphoto.data(),
            photoDocId: fphoto.id
        }
    )) 
    const photoWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false
            if(photo.likes.includes(userId)) {
                userLikedPhoto = true
            }
            const user = await getUserId(photo.userId)
            const {username} = user[0]
            return {username, ...photo, userLikedPhoto}
        })
    )

    return photoWithUserDetails  
    
}
export async function getUserNameExists(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

    const user = result.docs.map((item) => (
        {
            ...item.data(),
            docId: item.id
        }
    ))
   
    return user;
}
export async function  getUserPhotosByUsername(username) {
    const [user] = await getUserNameExists(username)
    console.log(user)
const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

    const photos = result.docs.map((item) => (
        {
            ...item.data(),
            docId: item.id
        }
    ))
    return photos
}

export  async function isUserFollowing(isLoggedInUserName, profileUserId) {
const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', isLoggedInUserName)
    .where('following', 'array-contains', profileUserId)
    .get();

    const [response = {}] = result.docs.map((item) => (
        {
            ...item.data(),
            docId: item.id
        }
    ))
   
    return response.userId

}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
   
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowingFollwers(profileDocId, followingUserId, isFollowingProfile);
  }