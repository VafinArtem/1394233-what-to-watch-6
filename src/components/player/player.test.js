import React from 'react';
import {render, screen} from '@testing-library/react';
import {testFilm} from '../../test-mock';
import userEvent from '@testing-library/user-event';
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

  it(`When the user clicks play the video should be paused`, () => {
    const {container} = render(
        <Player
          title={name}
          poster={posterImage}
          video={videoLink}
        />
    );

    const player = container.querySelector(`.player__video`);
    const playButton = container.querySelector(`.player__play`);

    userEvent.click(playButton);
    expect(player.pause());
  });
});
