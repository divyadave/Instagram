import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import { getUserNameExists } from '../../services/firebase';
import Header from '../../components/Header';
import UserProfile from '.';

function Profile() {
  const [userExists, setUserExists] = useState(false) 
  const {username} = useParams();
  const [user,setUser] = useState(null)
  const history = useHistory();
  useEffect(() => {
     
      async function checkUserExists() {
          const doesUserExists = await getUserNameExists(username);
          if(doesUserExists.length > 0) {
              setUser(doesUserExists[0])
              setUserExists(true)
          }
          else {
             setUserExists(false)
              history.push(ROUTES.NOT_FOUND)

          }
      }
      checkUserExists();
      
    
      
  }, [username, history]);
  return  userExists ? (
      <div className='bg-gray-background'>
          <Header></Header>
          <div className='mx-auto max-w-screen-lg'>
              <UserProfile user={user}></UserProfile>
          </div>

      </div>
  ): null 
}

export default Profile;
