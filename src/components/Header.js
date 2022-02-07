import React, { useContext } from 'react';
import FirebaseContext from '../context/firebase'
import userContext from '../context/user'
import {Link, useHistory} from 'react-router-dom'
import * as ROUTES from '../constants/routes'

function Header() {
  const { firebase} = useContext(FirebaseContext)
  const { user } = useContext(userContext)
  const history = useHistory()
  return (
      <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
      <div className="flex justify-between h-full">
      <div className="text-gray-700 text-center flex align-items items-center cursor-pointer">
      <h1>
      <Link to={ROUTES.DASHBOARD}>
      <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12"/>
      </Link>
      </h1>
      </div>
      <div className="flex align-items items-center text-center text-gray-700">
      {
          user ? (
              <>
              <Link to={ROUTES.DASHBOARD}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
              </Link>
              <button type="button" onClick={() => {firebase.auth().signOut();  history.push(ROUTES.LOGIN)} } onKeyDown={(event) => {
                  if(event.key === 'Enter') {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN)
                  }
              }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
</svg></button>
<div className="flex items-center cursor-pointer">
<Link to={`/p/${user.username}`}>
<img className="rounded-full h-8 w-8 flex" src={`/images/avatars/${user.displayName}.jpg`} alt={user.username} />
</Link>
</div>
              </>

          ) : (
              <>
              <Link to={ROUTES.LOGIN}>
                  <button type="button" className='bg-blue-medium rounded w-20 h-8 font-bold text-white text-sm'>Log In</button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                  <button type="button" className='text-blue-medium rounded w-20 h-8 font-bold text-sm'>Sign In</button>
              </Link>
              </>
          )
      }
      </div>


      </div>

      </div>
      </header>
  )
}

export default Header;
