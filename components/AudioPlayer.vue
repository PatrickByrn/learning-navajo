<template>
  <button
    @click="playAudio"
    class="flex justify-center items-center hover:bg-slate-100 rounded transition-colors"
  >
    <Icon
      class="text-slate-700 transition-colors"
      name="mdi:music-note-eighth"
    />
  </button>
</template>
<static-query>

</static-query>
<script setup lang="ts">
type PropTypes = {
  audioFileName: string;
};

const props = defineProps<PropTypes>();

const playAudio = () => {
  let audio = new Audio(`/audio/${props.audioFileName}`);
  audio.play();
};
</script>

<style scoped></style>
