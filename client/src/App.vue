<template>
  <div class="flex justify-center">
    <div>
      <board 
        :game-state="gameState"
        @place-token="placeToken"
      />
    </div>
  </div>
</template>

<script>

import apiClient from './apiClient';
import Board from './components/Board';

export default {
  name: 'App',
  components: {
    Board
  },

  data() {
    return {
      gameState: undefined,
    }
  },

  async created() {
    await this.loadOrCreateGame();
  },

  computed: {
    gameIdFromPath() {
      return window.location.pathname.split('/')[1]
    }
  },

  methods: {
    async loadOrCreateGame() {
      if (this.gameIdFromPath) {
        this.gameState = await apiClient.getGameState(this.gameIdFromPath);
      } else {
        this.gameState = await apiClient.createGame();
        window.location.pathname = this.gameState.id;
      }
    },

    async placeToken(column) {
      this.gameState = await apiClient.takeTurn({
        id: this.gameIdFromPath,
        column,
      });
    }
  }
}
</script>
