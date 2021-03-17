// import React from 'react';
// import {render} from '@testing-library/react';
// import Player from './player';
// import {testFilm} from '../../test-mock';

// const {name, videoLink, posterImage} = testFilm;

// it(`Player should render correctly`, () => {
//   const {getByText} = render(
//       <Player
//         title={name}
//         video={videoLink}
//         poster={posterImage}
//       />
//   );

//   const fullScreenTextElement = getByText(`Full screen`);
//   const playTextElement = getByText(`Play`);
//   const exitTextElement = getByText(`Exit`);
//   const nameTextElement = getByText(name);

//   expect(fullScreenTextElement).toBeInTheDocument();
//   expect(playTextElement).toBeInTheDocument();
//   expect(exitTextElement).toBeInTheDocument();
//   expect(nameTextElement).toBeInTheDocument();
// });
