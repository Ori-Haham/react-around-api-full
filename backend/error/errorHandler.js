const errorHandler = (err, req, res) => {
  if (err.name === 'CastError' || 'ValidationError') {
    res.status(400).send(err);
    return;
  }
  if (err.statusCode === 404) {
    res.status(404).send(err);
    return;
  }

  res.status(500).send({ message: err });
};

module.exports = errorHandler;
