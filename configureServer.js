const axios = require('axios');

const handleSuccess = res => serverRes => {
  res.status(serverRes.status)
  return res.json(serverRes.data)
};

const handleError = res => err => {
  const { response } = err;
  if (err.response) {
    res.status(response.status)
    return res.end(response.data);
  } else {
    res.status(500)
    return res.end()
  }
};

module.exports = (configs, server) => {
  configs.forEach(config => {
    server.get(`${config.path}*`, (req, res) =>
      axios.get(`${config.server}${req.originalUrl}`)
        .then(handleSuccess(res))
        .catch(handleError(res))
    );

    server.post(`${config.path}*`, (req, res) => {
      console.log(req.body)
      return axios.post(`${config.server}${req.originalUrl}`, req.body)
        .then(handleSuccess(res))
        .catch(handleError(res))
    })
  });
}
