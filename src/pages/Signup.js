import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes'
import { doesUsernameExists } from '../services/firebase';

function SignUp() {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext)

    const [username, setUserName] = useState('');
    const [fullname, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const invalid = password === '' || emailAddress === ''

    const handleSignUp = async (event) => {
      event.preventDefault()
      const usernameExists = await doesUsernameExists(username)
      if(!usernameExists) {
          try {
              const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
              await createdUserResult.user.updateProfile({
                  displayName: username
              })

              await firebase.firestore().collection('users').add({
                  userId: createdUserResult.user.uid,
                  username: username.toLowerCase(),
                  fullname,
                  emailAddress: emailAddress.toLowerCase(),
                  following: [],
                  dateCreated: Date.now()
              })

              history.push(ROUTES.DASHBOARD)

          }
          catch(error) {
              setFullName('')
              setEmailAddress('')
              setPassword('')
              setError(error.message)

          }
      }
      else {
          setError('This username already taken. Try another.')
      }
     
    }

    useEffect(() => {
        document.title = 'Sign Up | Instagram'

    }, [])



  return(
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
    <div className="flex w-3/5">
    <img src="/images/iphone-with-profile.jpg" className="max-w-full" />
    </div>
     <div className="flex flex-col w-2/5">
     <div className="flex flex-col items-center bg-white rounded p-4 border border-gray-primary mb-4">
     <h1 className="flex justify-center w-full">
     <img src="/images/logo.png" alt="instagram" className="mt-4 w-6/12 mb-4"/>
     </h1>
     {error && <p className="text-xs text-red-primary">{error}</p>}
     <form method="POST" onSubmit={handleSignUp}>
     <input type="text" placeholder="Username" className="text-sm text-gray-base w-full mr-3 py-3 px-4 border border-gray-primary rounded mb-2"
     onChange={({target}) => setUserName(target.value)} value={username} />
      <input type="text" placeholder="Fullname" className="text-sm text-gray-base w-full mr-3 py-3 px-4 border border-gray-primary rounded mb-2"
     onChange={({target}) => setFullName(target.value)} value={fullname} />
     <input type="text" placeholder="Email address" className="text-sm text-gray-base w-full mr-3 py-3 px-4 border border-gray-primary rounded mb-2"
     onChange={({target}) => setEmailAddress(target.value)} value={emailAddress} />
       <input type="password" placeholder="Password" className="text-sm text-gray-base w-full mr-3 py-3 px-4 border border-gray-primary rounded mb-2"
     onChange={({target}) => setPassword(target.value)} value={password} />
     <button disabled={invalid} type="submit" className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${invalid && 'opacity-50'}`}>Sign In</button>
     </form>
    </div>
     <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary">
    <p className="text-sm">Have an account? {''}
    <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Login</Link>
    </p>
    </div>

    </div>
   
    </div>
  ) 

}

export default SignUp;
