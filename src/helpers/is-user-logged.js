import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function IsUserLoggedIn({user, loggedInPath, children, ...rest}) {
  return (
      <Route {...rest} render={({location}) => {
          if(!user) {
              return children

          }
          if(user) {
              return (
                  <Redirect to={{ pathname: loggedInPath, state: {from: location}}}></Redirect>
              )
          }
      }}>

      </Route>
  )
}

export default IsUserLoggedIn;
