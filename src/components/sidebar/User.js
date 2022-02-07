import React, { memo, useEffect } from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function User({username, fullName}) {
   
  return (
      !username || !fullName ? (
          <Skeleton height={61} count={1}></Skeleton>
      ) : (
          <Link to={`/p/${username}`} className='grid grid-cols-4 gap-4 mb-6 items-center'>
              <div className='flex items-center justify-between col-span-1'>
                  <img src="/images/avatars/karl.jpg" className='rounded-full w-full mr-3' />

              </div>
              <div className='col-span-3'>
                  <p className='font-bold text-sm'>{username}</p>
                  <p className='text-sm'>{fullName}</p>

              </div>
          </Link>
      )
  );
}
User.prototype = {
    username: propTypes.string,
    fullName: propTypes.string

}
export default memo(User);
User.whyDidYouRender = true