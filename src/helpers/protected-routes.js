import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import * as ROUTES from '../constants/routes';

function ProtectedRoutes({user, children, ...rest}) {
  return (
      <Route {...rest} render={({location}) => {
          if(user) {
              return children

          }
          if(!user) {
              return (
                  <Redirect to={{ pathname: ROUTES.LOGIN, state: {from: location}}}></Redirect>
              )
          }
      }}>

      </Route>
  )
}

export default ProtectedRoutes;
