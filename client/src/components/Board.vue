<template>
  <div class="bg-blue-400 flex justify-between p-4 pb-8">
    <div
      v-for="(coloumn, i) in gameState.board"
      :key="`column-${i}`"
      class="flex flex-col-reverse justify-center items-center w-full cursor-pointer mx-2"
      @click="placeToken(i)"
      @mouseenter="hoveredColoumn = i"
      @mouseleave="hoveredColoumn == i && (hoveredColoumn = undefined)"
    >
      <div
        v-if="interactive && hoveredColoumn == i"
        class="rounded-full absolute top-0 w-10 h-10 sm:w-14 h-14"
        :class="nextTokenClass"
      />
      <div
        v-for="(token, i) in coloumn"
        :key="`column-${i}-row${i}`"
        class="w-8 h-8 sm:w-12 sm:h-12 my-2"
      >
        <div 
          class="rounded-full h-full"
          :class="getTokenClasses(token)"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const redToken = 'bg-red-300';
const yellowToken = 'bg-yellow-200';
const noToken = 'bg-gray-200';

export default {
  props: {
    gameState: { type: Object, required: true },
    interactive: { type: Boolean, required: true },
  },

  data() {
    return {
      hoveredColoumn: undefined
    };
  },

  computed: {
    nextTokenClass() {
      if (this.gameState.nextPlayer == 'RED') {
        return redToken;
      }
      return yellowToken;
    }
  },

  methods: {
    canPlaceToken(column) {
      return this.interactive && this.gameState.board[column].indexOf('_') != -1;
    },

    placeToken(column) {
      this.canPlaceToken(column) && this.$emit('place-token', column);
    },

    getTokenClasses(token) {
      switch (token) {
      case 'RED':
        return redToken;
      case 'YELLOW':
        return yellowToken;
      default:
        return noToken;
      }
    }
  }
}
</script>