import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import Movie from '../movie/movie';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import Player from '../player/player';
import NotFoundPage from '../not-found-page/not-found-page';
import {Url} from '../../consts';
import {MOVIES_PROP, MOVIES_NOT_REQUIRE_PROP} from '../../utils/validate';
import {fetchFilm} from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import {getFilms, getLoadedFilm} from '../../store/films/selectors';

const App = ({films, loadFilm, loadedFilm}) => {
  return (
    <Switch>
      <Route exact path={Url.MAIN}>
        <Main />
      </Route>
      <Route exact path={Url.SIGN_IN} render={() => <SignInScreen />}>
      </Route>
      <PrivateRoute exact
        path={Url.MY_LIST}
        render={() => <MyList />}
      />
      <Route exact path={Url.MOVIE} render={({history, match}) => {
        const id = match.params.id;
        if (films.length !== 0) {
          return <Movie
            film={films[id - 1]}
            id={id}
            onPlayMovie={() => history.push(`/player/${id}`)}
            onAddFavoriteMovie={() => history.push(Url.MY_LIST)}
          />;
        }
        if (loadedFilm === null) {
          loadFilm(id);
          return <LoadingScreen />;
        }
        return <Movie
          film={loadedFilm}
          id={id}
          onPlayMovie={() => history.push(`/player/${id}`)}
        />;
      }}/>
      <PrivateRoute exact
        path={Url.ADD_REVIEW}
        render={({match}) => {
          const filmID = match.params.id;
          if (films.length !== 0) {
            const {name, posterImage, backgroundImage, id} = films[filmID - 1];
            return <AddReview
              title={name}
              poster={posterImage}
              backgroundImage={backgroundImage}
              filmID={id}
            />;
          }
          if (loadedFilm !== null) {
            const {name, posterImage, backgroundImage, id} = loadedFilm;
            return <AddReview
              title={name}
              poster={posterImage}
              backgroundImage={backgroundImage}
              filmID={id}
            />;
          }

          return <LoadingScreen />;
        }}
      />
      <Route exact path={Url.PLAYER} render={({match}) => {
        const filmID = match.params.id;
        if (films.length !== 0) {
          const {name, posterImage, videoLink} = films[filmID - 1];
          return <Player
            title={name}
            video={videoLink}
            poster={posterImage}
          />;
        }
        if (loadedFilm === null) {
          loadFilm(filmID);
          return <LoadingScreen />;
        }
        const {name, posterImage, videoLink} = loadedFilm;
        return <Player
          title={name}
          video={videoLink}
          poster={posterImage}
        />;
      }} />
      <Route exact path={Url.NOT_FOUND}>
        <NotFoundPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(MOVIES_PROP).isRequired),
  loadedFilm: PropTypes.shape(MOVIES_NOT_REQUIRE_PROP),
  loadFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  loadedFilm: getLoadedFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFilm(id) {
    dispatch(fetchFilm(id));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
