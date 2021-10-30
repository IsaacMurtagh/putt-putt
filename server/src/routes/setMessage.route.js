const inMemoryDb = require('../database/inMemoryDb');

function handler(request, h) {
  const { message } = request.payload;
  inMemoryDb.message = message;
  return { message };
}

module.exports = {
  method: 'POST',
  path: '/message',
  handler,
};