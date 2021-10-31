const boom = require('@hapi/boom');

const Event = require('../models/Event');
const eventsTable = require('../tables/eventsTable');
const ConnectFour = require('../models/ConnectFour');

async function handler(request, h) {
  const id = request.params.id;
  const { column } = request.payload;
  const events = await eventsTable.getAllEvents(id);
  if (!events.length) {
    throw boom.forbidden('INVALID_GAME_ID');
  }
  const connectFour = ConnectFour.fromEvents(events);
  const event = Event.takeTurn({
    column,
    id,
    number: events.length,
  });
  try {
    event.apply(connectFour);
  } catch {
    throw boom.forbidden('ILLEGAL_MOVE');
  }
  await eventsTable.create(event);
  return connectFour.toApiResponse();
}

module.exports = {
  method: 'POST',
  path: '/connect-four/{id}/take-turn',
  handler,
};