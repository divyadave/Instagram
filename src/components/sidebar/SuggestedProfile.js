import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateFollowingFollwers, updateLoggedInUserFollowing } from '../../services/firebase';

function SuggestedProfile({profileDocId, username, profileId, userId, loggedInDocId}) {
    const [followed, setFollowed] = useState(false)
    async function handleFollow() {
        setFollowed(true)
        await updateLoggedInUserFollowing(loggedInDocId, profileId, false)
        await updateFollowingFollwers(userId, profileDocId, false)

    }
  return !followed ? (
      <div className='flex flex-row items-center align-items justify-between mb-2'>
          <div className='flex items-center justify-between'>
              <img src={`/images/avatars/${username}.jpg`} className='rounded-full w-8 mr-3 flex' />
              <Link to={`/p/${username}`}>
                  <p className='font-bold text-sm'>{username}</p>
              </Link>
          </div>
          <div>
              <button type="button" onClick={() => handleFollow()} className='text-xs font-bold text-blue-medium'>Follow</button>
          </div>

      </div>
  ) : null;
}

export default SuggestedProfile;
SuggestedProfile.prototype = {
    profileDocId: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    profileId: propTypes.string.isRequired,
    userId: propTypes.string.isRequired

}
