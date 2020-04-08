const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const indexValidation = (req, res, next) => {
  const { id } = req.params;

  const result = repositories.findIndex((e) => e.id === id);

  result < 0 ? res.status(400).json({ error: 'error' }) : next();
};

app.get('/repositories', (request, response) => {
  // TODO
  return response.send(repositories);
});

app.post('/repositories', (request, response) => {
  // TODO
  const { techs, title, url } = request.body;

  const repo = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repo);

  return response.status(201).json(repo);
});

app.put('/repositories/:id', indexValidation, (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((e) => e.id === id);
  const { likes } = repositories[repoIndex];

  repositories[repoIndex] = { id, title, url, techs, likes };

  const newRepo = repositories[repoIndex];

  return response.send(newRepo);
});

app.delete('/repositories/:id', indexValidation, (req, res) => {
  // TODO
  const { id } = req.params;
  const repoIndex = repositories.findIndex((e) => e.id === id);

  if (repoIndex < 0) {
    return res.status(400).send();
  }

  repositories.splice(repoIndex, 1);

  return res.status(204).send();
});
app.use('/repositories/:id/like', indexValidation);
app.post('/repositories/:id/like', (request, response) => {
  // TODO
  const { id } = request.params;

  const repoIndex = repositories.findIndex((e) => e.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'id does not exist' });
  }

  repositories[repoIndex].likes += 1;

  const { likes } = repositories[repoIndex];

  return response.json({ likes });
});

module.exports = app;
