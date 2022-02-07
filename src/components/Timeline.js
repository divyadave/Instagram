import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import 'react-loading-skeleton/dist/skeleton.css'
import Post from './post/Post';

function Timeline() {
  const {photos } = usePhotos()
  console.log(photos)
  return <div className='container col-span-2'>
    {
      !photos ? (
       <>
       {
          <Skeleton count={4} width={640} height={500}></Skeleton>
         })
       
       </>
      ) : photos.length > 0 ? (
        <>
         {
           photos.map((content) => {
             return <Post key={content.photoDocId} content={content}></Post>
           })
         }

        </>
      ) : (
        <p className='text-center text-2xl'>Follow People to see Photos</p>
      )
    }
  </div>
}

export default Timeline;
