const { nanoid } = require('nanoid');
const movies = require('./movies');

// Add movies
const addMoviesHandler = (request, h) => {
  const id = nanoid(16);
  const { title, year, director, summary, productionCompany, duration, watchedDuration, watching } = request.payload;
  const finished = watchedDuration === watching;
  const insertedAt = new Date.toString();
  const updatedAt = insertedAt;
  const newMovies = {
    id, title, year, director, summary, productionCompany, duration, watchedDuration, watching, finished, insertedAt, updatedAt,
  };

  if (!title) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan film! Mohon isi judul film!',
    });
    response.code(400);
    return response;
  };

  if (watchedDuration > duration) {
    const response = h.response({
      status: 'fail',
      message: 'Durasi menonton lebih panjang daripada durasi film!',
    });
    response.code(400);
    return response;
  };

  movies.push(newMovies);
  const isSuccess = movies.filter((n) => n.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan film',
      data: {
        moviesId: id,
      },
    });
    response.code(200);
    return response;
  }
};

// Get Movies
const getMoviesHandler = (request, h) => {
  const { title, watching, finished } = request.query;

  let filteredMovies = movies;
  if (title !== undefined) {
    filteredMovies = filteredMovies.filter((movie) => movie.name.toLowerCase().includes(name.toLowerCase()));
  };
  if (watching !== undefined) {
    const isWaching = watching === '1';
    filteredMovies = filteredMovies.filter((movie) => movie.watching === isWaching);
  }
  if (finished !== undefined) {
    const isFinished = watching === '1';
    filteredMovies = filteredMovies.filter((movie) => movie.finished === isFinished);
  };

  const responseMovies = filteredMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    productionCompany: movie.productionCompany,
  }));

  const response = h.response({
    status: 'success',
    data: {
      movie: responseMovies,
    },
  });
  response.code(200);
  return response;
};

// Get movies by id
const getMoviesByIdHandler = (request, h) => {
  const { id } = request.params;
  const movie = movies.filter((n) => n.id === id)[0];
  if  (movie !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        movie,
      },
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    status: 'fail',
    message: 'Movie tidak ditemukan!'
  });
  response.code(404);
  return response;
};

const updatedMoviesByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, year, director, summary, productionCompany, duration, watchedDuration, watching } = request.payload;

  const index = index.findeIndex((n) => n.id === id);

  if (index !== -1) {
    movies[index] = {
      ...movies[index],
      title,
      year,
      director,
      summary,
      productionCompany,
      duration,
      watchedDuration,
      watching,
    };

    if (!title) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui data! Silakan isi judul movie!',
      });
      response.code(400);
      return response;
    };

    if (watchedDuration > duration) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui data! wacthedDuration tidak boleh lebih besar dari duration',
      });
      response.code(200);
      return response;
    };

    const response = h.response({
      status: 'success',
      message: 'Berhasil memperbarui data!',
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Id tidak ditemukan!',
  });
  response.code(404);
  return response;
};

const deleteMoviesByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = movies.findeIndex((n) => n.id === id);

  if (index !== -1) {
    movies.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus movie',
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus',
  });
  response.code(400);
  return response;
};

module.exports = {
  addMoviesHandler,
  getMoviesHandler,
  getMoviesByIdHandler,
  updatedMoviesByIdHandler,
  deleteMoviesByIdHandler,
};