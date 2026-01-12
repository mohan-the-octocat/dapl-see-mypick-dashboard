import React from 'react';

export const ImageContext = React.createContext({
  openImage: (src, alt) => {},
  closeImage: () => {}
});
