import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

function Suggestions({userId, following, loggedInDocId}) {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
      async function getProfiles() {
          const response = await getSuggestedProfiles(userId, following)
          console.log('response', response)
          setProfiles(response)
      }
      if(userId)
      {
      getProfiles();
      }

  }, [userId])

  return (
      !profiles ? (
          <Skeleton count={1} height={150} className='mt-5'></Skeleton>

      ) : profiles.length > 0 ? (
          <div className='rounded flex flex-col'>
              <div className='text-sm flex items-center align-items justify-between mb-2'>
                  <p className='font-bold text-gray-base'>Suggestions For You</p>
                  </div>
                  <div className='mt-4 grid grid-5'>
                  {
                      profiles.map((profile) => (
                        <SuggestedProfile key={profile.docId} profileDocId={profile.docId} username={profile.username} profileId={profile.userId} userId={userId} loggedInDocId={loggedInDocId}></SuggestedProfile>
                      ))
                  }
                 </div>

             

          </div>

      ) : null
  );
}

export default Suggestions;
