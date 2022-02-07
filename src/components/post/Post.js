import React, { useRef } from 'react';
import Actions from './Actions';
import Comment from './Comment';
import Footer from './Footer';
import Header from './Header';
import Image from './Image';

function Post({content}) {
    const comment = useRef(null)
    const handleFocus = () => comment.current.focus()
  return (
      <div className='rounded col-span-4 border bg-white border-gray-primary mb-8'>
           <Header username={content.username}></Header>
           <Image src={content.imageSrc} caption={content.caption}></Image>
           <Actions docId={content.photoDocId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}></Actions>
        <Footer username={content.username} caption={content.caption}></Footer>
        <Comment docId={content.photoDocId} comments={content.comments} posted={content.dateCreated} commentInput={comment}></Comment>
      </div>
  )
 
}

export default Post;
