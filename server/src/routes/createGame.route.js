const eventsTable = require('../tables/eventsTable');
const Event = require('../models/Event');
const ConnectFour = require('../models/ConnectFour');

async function handler(request, h) {
  const event = Event.createGame();
  await eventsTable.create(event);
  const connectFour = ConnectFour.fromEvents([event]);
  return connectFour.toApiResponse();
}

module.exports = {
  method: 'POST',
  path: '/connect-four',
  handler,
};