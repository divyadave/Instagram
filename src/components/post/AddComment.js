import React, { useContext, useState } from 'react';
import FirebaseContext from '../../context/firebase';

import  userContext from '../../context/user'

function AddComment({docId, setComments, comments, commentInput}) {
    const [comment, setComment] = useState('');
    const {firebase, FieldValue} = useContext(FirebaseContext)
    const {
        user: {displayName} }= useContext(userContext)
    
    const handleSubmitComment = (event) => {
        event.preventDefault();
        setComments([ ...comments, {displayName, comment}])
        setComment('')

        return firebase
        .firestore()
        .collection('photos')
        .doc(docId)
        .update({
            comments: FieldValue.arrayUnion({displayName, comment})
        })
       

    }
  return <div className='border-t border-gray-primary'>
      <form className='flex justify-between pl-0 pr-5' method='POST' onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault() }>
      <input type="text" autoComplete='false' className='text-sm text-gray-base w-full mr-3 py-5 px-4' name="addComment" placeholder='Add Comment...' value={comment} ref={commentInput} onChange={({target}) => setComment(target.value) } ></input>
     <button type="button" className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`} disabled={comment.length < 1} onClick={ handleSubmitComment}>Post</button> 
      </form>
  </div>
}

export default AddComment;
