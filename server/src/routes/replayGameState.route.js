const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const eventsTable = require('../tables/eventsTable');
const ConnectFour = require('../models/ConnectFour');

async function handler(request, h) {
  const id = request.params.id;
  const number = request.query.number || 1;
  const events = await eventsTable.getEventsUpTo({id, number });
  if (!events.length) {
    throw boom.forbidden('INVALID_GAME_ID');
  }
  const connectFour = ConnectFour.fromEvents(events);
  return connectFour.toApiResponse();
}

module.exports = {
  method: 'GET',
  path: '/connect-four/{id}/replay',
  options: {
    validate: {
        query: Joi.object({
          number: Joi.number().positive(),
        }),
    }
  },
  handler,
};