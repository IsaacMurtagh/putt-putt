const dbClient = require('../database/dynamoClient');
const Event = require('../models/Event');

class EventsTable {
  constructor() {
    this.name = 'Events';
  }

  async create(event) {
    return dbClient.put({
      TableName: this.name,
      Item: event.toDocument(),
      ConditionExpression: 'attribute_not_exists(pk)',
    }).promise()
    .then(() => {
      return event;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
  }

  async getAllEvents(id) {
    return dbClient.query({
      TableName: this.name,
      ExpressionAttributeValues: {
        ':pk': id,
        ':sk': 'Event#'
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)'
    }).promise()
    .then(result => {
      return result.Items ? result.Items.map(item => Event.fromDocument(item)) : [];
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
  }

  async getEventsUpTo({ id, number }) {
    return dbClient.query({
      TableName: this.name,
      ExpressionAttributeValues: {
        ':pk': id,
        ':sk': 'Event#'
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
      Limit: number,
    }).promise()
    .then(result => {
      return result.Items ? result.Items.map(item => Event.fromDocument(item)) : [];
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
  }
}
const connectionsTable = new EventsTable();
module.exports = connectionsTable;