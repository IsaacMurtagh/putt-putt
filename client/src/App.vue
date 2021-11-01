<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-center space-x-20 mt-10">
      <div>
        <board
          :game-state="gameState"
          :interactive="interactive"
          @place-token="placeToken"
        />
      </div>
      <div class="w-1/3 flex items-center justify-center">
        <controls
          :event-number="gameState?.eventNumber"
          :final="interactive"
          @new-game="createGame"
          @to-end="loadGame"
          @to-beginning="loadGameAtEvent(0)"
          @back-one="loadGameAtEvent(gameState.eventNumber - 1)"
          @forward-one="loadGameAtEvent(gameState.eventNumber + 1)"
        />
      </div>
    </div>
    <div class="flex flex-grow bg-gray-700 p-4">
      <!-- TODO: Add a view of different projections and show events -->
    </div>
  </div>
</template>

<script>

import apiClient from './apiClient';
import Board from './components/Board';
import Controls from './components/Controls';

export default {
  name: 'App',
  components: {
    Board,
    Controls,
  },

  data() {
    return {
      gameState: undefined,
      interactive: true,
    }
  },

  async created() {
    if (this.gameIdFromPath) {
      await this.loadGame();
    } else {
      await this.createGame();
    }
  },

  computed: {
    gameIdFromPath() {
      return window.location.pathname.split('/')[1]
    }
  },

  methods: {
    async loadGame() {
      this.gameState = await apiClient.getGameState(this.gameIdFromPath);
      this.interactive = true;
    },

    async createGame() {
      this.gameState = await apiClient.createGame();
      window.location.pathname = this.gameState.id;
    },

    async loadGameAtEvent(number) {
      const eventNumber = this.gameState?.eventNumber;
      this.gameState = await apiClient.getGameStateAtEvent({
        id: this.gameIdFromPath,
        number,
      });
      this.interactive = (eventNumber == this.gameState.eventNumber);
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
<style>
body, html, main {
  height: 100%;
}
</style>