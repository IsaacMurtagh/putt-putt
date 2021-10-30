const inMemoryDb = require('../database/inMemoryDb');

function handler() {
  const { message } = inMemoryDb;
  return { message };
}

module.exports = {
  method: 'GET',
  path: '/last-message',
  handler,
};