<template>
  <div class="bg-blue-100 p-4 border-8 border-green-400 space-y-4">
    <div class="text-2xl flex justify-center">Controls</div>

    <div>
      <button @click="$emit('new-game')" class="w-full btn bg-green-400 hover:bg-green-300">
        New Game
      </button>
    </div>

    <div class="flex space-x-2">
      <button 
        @click="$emit('to-beginning')" 
        class="btn bg-yellow-500 hover:bg-yellow-300"
        :disabled="eventNumber == 0"
      >
        ≪
      </button>
      <button 
        @click="$emit('back-one')" 
        class="btn bg-yellow-500 hover:bg-yellow-300"
        :disabled="eventNumber == 0"
      >
        ＜
      </button>
      <button @click="$emit('forward-one')" class="btn bg-yellow-500 hover:bg-yellow-300" :disabled="final">
        ＞
      </button>
      <button @click="$emit('to-end')" class="btn bg-yellow-500 hover:bg-yellow-300" :disabled="final">
        ≫
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eventNumber: { type: Number, default: 0 },
    final: { type: Boolean, required: true },
  }
}
</script>
<style>
  .btn {
    @apply rounded-2xl p-4 text-xl ;
  }

  .btn:disabled {
    @apply bg-gray-300 hover:bg-gray-300 cursor-auto !important;
  }

</style>