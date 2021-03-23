import React from 'react';
import {render, screen} from '@testing-library/react';
import VideoPreview from './video-preview';
import {testFilm} from '../../test-mock';

const {posterImage, previewVideoLink} = testFilm;
describe(`VideoPreview test`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });
  it(`AddReview should render correctly`, () => {
    window.HTMLMediaElement.prototype.play = () => {};
    const isPlaying = true;
    const setIsPlaying = jest.fn();
    render(
        <VideoPreview
          poster={posterImage}
          url={previewVideoLink}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
    );

    expect(screen.getByTestId(`videoPreview`)).toBeInTheDocument();
  });
});
