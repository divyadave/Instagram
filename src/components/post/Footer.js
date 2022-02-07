import React from 'react';

function Footer({username, caption}) {
  return  <div className="p-4 pt-2 pb-1">
  <span className="mr-1 font-bold">{username}</span>
  <span className="italic">{caption}</span>
</div>
}

export default Footer;
