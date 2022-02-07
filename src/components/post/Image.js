import React from 'react';

function Image({src, caption}) {
  return <img src={src} alt={caption}></img>;
}

export default Image;
