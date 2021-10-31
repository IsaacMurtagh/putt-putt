const boom = require('@hapi/boom');

const eventsTable = require('../tables/eventsTable');
const ConnectFour = require('../models/ConnectFour');

async function handler(request, h) {
  const id = request.params.id;
  const events = await eventsTable.getAllEvents(id);
  if (!events.length) {
    throw boom.forbidden('INVALID_GAME_ID');
  }
  const connectFour = ConnectFour.fromEvents(events);
  return connectFour.toApiResponse();
}

module.exports = {
  method: 'GET',
  path: '/connect-four/{id}',
  handler,
};