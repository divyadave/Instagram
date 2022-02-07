import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import userContext from './context/user'
import ProtectedRoutes from "./helpers/protected-routes";
import Dashboard from "./pages/Dashboard";
import IsUserLoggedIn from "./helpers/is-user-logged";


 const Login = lazy(() => import('./pages/Login'))
  const SignUp = lazy(() => import('./pages/Signup'))
  const notFound = lazy(() => import('./pages/NotFound'))
  const Profile = lazy(() => import('./components/profile/Profile'))


function App() {
  const { user } = useAuthListener();
 
 
  return (
    <userContext.Provider value={{ user }}>
   <Router>
   <Suspense fallback={<p>Loading...</p>}>
    <Switch>
      <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
      <Login></Login>
      </IsUserLoggedIn>
      <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}> 
      <SignUp></SignUp>
      </IsUserLoggedIn>
        <Route path={ROUTES.PROFILE} component={Profile} exact></Route>
        <Route path={ROUTES.NOT_FOUND} component={notFound}></Route>
        <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
         <Dashboard></Dashboard>
         </ProtectedRoutes>
    </Switch>
    </Suspense>
   
    </Router>
    </userContext.Provider>
  );
}

export default App;
