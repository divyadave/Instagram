import React from 'react';
import useUser from '../../hooks/use-user';
import Suggestions from './Suggestions';
import User from './User';


function Sidebar() {

    const {user: {fullname, username, userId, following, docId}} = useUser();
    
  return <div className="p-4">
    <User username={username} fullName={fullname}></User>
      <Suggestions userId={userId} following={following} loggedInDocId={docId}></Suggestions> 
  </div>;
}

export default Sidebar;
