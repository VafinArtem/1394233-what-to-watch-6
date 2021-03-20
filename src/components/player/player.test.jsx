import React from 'react';
import {render, screen} from '@testing-library/react';
import {testFilm} from '../../test-mock';
import Player from './player';


const {name, posterImage, videoLink} = testFilm;
describe(`Test video player`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`Player should be render correctly`, () => {
    render(
        <Player
          title={name}
          poster={posterImage}
          video={videoLink}
        />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
