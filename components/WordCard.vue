<template>
  <div class="list-group-item border p-2 rounded shadow">
    <div class="word-card flex justify-center items-center">
      <p class="word-translation flex-grow">
        {{ props.word.fields.navajo }} : {{ word.fields.english }}
      </p>
      <div class="flex justify-center items-center">
        <button
          :aria-checked="isWordFavorite"
          class="group btn transition-colors rounded p-1 mx-1 flex justify-center items-center"
          @click="
            isWordFavorite
              ? userStore.unFavoriteWord(word)
              : userStore.favoriteWord(word)
          "
        >
          <Icon
            v-if="!isWordFavorite"
            name="mdi:star-outline"
            class="text-slate-300 group-hover:text-yellow-500"
          ></Icon>
          <Icon
            v-if="isWordFavorite"
            name="mdi:star"
            class="text-yellow-500 group-hover:text-yellow-400"
          ></Icon>
        </button>
        <AudioPlayer
          class="p-1"
          v-if="word.fields.audioFileName"
          :audioFileName="word.fields.audioFileName"
        ></AudioPlayer>
        <button
          @click="expandCard"
          class="btn p-1 mx-1 flex justify-center items-center transition-transform"
          :class="cardExpanded ? `rotate-180` : ''"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <Icon name="mdi:chevron-down"></Icon>
        </button>
        <button
          v-show="!isWordSelected"
          class="group btn transition-colors rounded hover:bg-emerald-400 p-1 mx-1 flex justify-center items-center"
          @click="userStore.selectWord(word)"
        >
          <Icon name="mdi:check" class="group-hover:text-white"></Icon>
        </button>
        <button
          v-show="isWordSelected"
          class="btn transition-colors rounded bg-rose-400 hover:bg-rose-500 p-1 mx-1 flex justify-center items-center"
          @click="userStore.unSelectWord(word)"
        >
          <Icon name="mdi:close" class="text-white"></Icon>
        </button>
      </div>
    </div>
    <div
      v-if="cardExpanded"
      class="wl-additional-info-container bg-slate-100 p-2 rounded transition-size mt-1"
    >
      <p>Tags: {{ word.fields.tags ? "n/a" : word.fields.tags }}</p>
      <p>
        Conversational Navajo Workbook Pages:
        {{
          word.fields.pagesConversation !== ""
            ? word.fields.pagesConversation
            : "n/a"
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Word } from "types/types";
import { ref } from "vue";
import { useUserStore } from "~~/stores/UserStore";

type PropTypes = {
  word: Word;
};
const props = defineProps<PropTypes>();

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

const cardExpanded = ref(false);

const expandCard = () => {
  cardExpanded.value
    ? (cardExpanded.value = false)
    : (cardExpanded.value = true);
};

const isWordFavorite = computed((): boolean => {
  const indexOfSelectedWord = userStoreRef.words.value.findIndex(
    (o) => o.id === props.word.id
  );
  if (
    indexOfSelectedWord !== -1 &&
    userStoreRef.words.value[indexOfSelectedWord].favorite
  ) {
    return true;
  } else {
    return false;
  }
});

const isWordSelected = computed((): boolean => {
  const indexOfSelectedWord = userStoreRef.words.value.findIndex(
    (o) => o.id === props.word.id
  );

  if (
    indexOfSelectedWord !== -1 &&
    userStoreRef.words.value[indexOfSelectedWord].selected
  ) {
    return true;
  } else {
    return false;
  }
});
</script>

<style scoped></style>
