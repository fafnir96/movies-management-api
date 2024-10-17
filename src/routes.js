const {
  addMoviesHandler,
  getMoviesHandler,
  getMoviesByIdHandler,
  updatedMoviesByIdHandler,
  deleteMoviesByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/movies',
    handler: addMoviesHandler,
  },
  {
    method: 'GET',
    path: '/movies',
    handler: getMoviesHandler,
  },
  {
    method: 'GET',
    path: '/movies/{id}',
    handler: getMoviesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/movies{id}',
    handler: updatedMoviesByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/movies/{id}',
    handler: deleteMoviesByIdHandler,
  },
];

module.exports = routes;