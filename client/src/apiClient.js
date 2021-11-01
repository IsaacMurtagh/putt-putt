import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {

  async createGame() {
    return await instance.post('/connect-four')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('CreateGameApiFailed');
      throw err;
    });
  },

  async getGameState(id) {
    return await instance.get(`/connect-four/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('GetGameStateApiFailed');
      throw err;
    });
  },

  async getGameStateAtEvent({ id, number }) {
    return await instance.get(`/connect-four/${id}/replay`, {
      params: {
        number,
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('GetGameStateApiFailed');
      throw err;
    });
  },

  async takeTurn({ id, column }) {
    return await instance.post(`/connect-four/${id}/take-turn`, {
      column,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error('TakeTurnApiFailed', { column });
      throw err;
    });
  }

}