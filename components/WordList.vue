<template>
  <div>
    <div
      class="control container w-auto mx-auto flex flex-wrap items-center justify-center"
    >
      <p class="p-2">Search</p>
      <input
        class="input border rounded p-1"
        type="text"
        placeholder="word, page #, tags..."
        v-model="filterText"
      />
      <button
        class="border rounded p-1 ml-2 hover:bg-slate-100 rounded transition-colors"
        @click="onlyShowFavorites = !onlyShowFavorites"
      >
        <Icon
          v-if="!onlyShowFavorites"
          name="mdi:star-outline"
          class="text-slate-300 group-hover:text-yellow-500"
        ></Icon>
        <Icon
          v-if="onlyShowFavorites"
          name="mdi:star"
          class="text-yellow-500 group-hover:text-yellow-400"
        ></Icon>
      </button>
    </div>
    <div class="container w-auto mx-auto flex justify-center items-center">
      <button
        @click="currentPageCount = 1"
        :disabled="currentPageCount == 1"
        class="group border px-2 py-2 my-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:page-first"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      <button
        @click="prevPage"
        :disabled="currentPageCount == 1"
        class="group border px-2 py-2 my-2 mx-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:arrow-left"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      {{ currentPageCount }} of {{ totalPages }}
      <button
        @click="nextPage"
        :disabled="currentPageCount == totalPages"
        class="group border px-2 py-2 my-2 mx-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:arrow-right"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      <button
        @click="currentPageCount = totalPages"
        :disabled="currentPageCount == totalPages"
        class="group border px-2 py-2 my-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:page-last"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
    </div>
    <div
      class="container w-auto mx-auto border round flex justify-center items-center p-2"
    >
      <p class="flex-grow">Navajo : English</p>
      <button
        @click="deSelectCurrentPage(filteredWordList)"
        class="group btn transition-colors rounded hover:bg-rose-500 p-1 mx-1 flex justify-center items-center"
      >
        <Icon name="mdi:trash-can" class="group-hover:text-white" />
      </button>
      <button
        @click="selectCurrentPage(filteredWordList)"
        class="group btn transition-colors rounded hover:bg-emerald-400 p-1 mx-1 flex justify-center items-center"
      >
        <Icon name="mdi:check-all" class="group-hover:text-white" />
      </button>
    </div>
    <TransitionGroup name="list" tag="div">
      <WordCard
        v-for="word in filteredWordList"
        :key="word.id"
        :word="word"
        class="my-1"
      />
    </TransitionGroup>
    <div class="container w-auto mx-auto flex justify-center items-center">
      <button
        @click="currentPageCount = 1"
        :disabled="currentPageCount == 1"
        class="group border px-2 py-2 my-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:page-first"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      <button
        @click="prevPage"
        :disabled="currentPageCount == 1"
        class="group border px-2 py-2 my-2 mx-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:arrow-left"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      {{ currentPageCount }} of {{ totalPages }}
      <button
        @click="nextPage"
        :disabled="currentPageCount == totalPages"
        class="group border px-2 py-2 my-2 mx-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:arrow-right"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
      <button
        @click="currentPageCount = totalPages"
        :disabled="currentPageCount == totalPages"
        class="group border px-2 py-2 my-2 rounded hover:bg-slate-100 disabled:bg-slate-50 disabled:border-slate-200"
      >
        <Icon
          name="mdi:page-last"
          class="text-slate-700 group-disabled:text-slate-200 transition-color"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Word } from "types/types";
import { storeToRefs } from "pinia";
import { useDictionaryStore } from "~~/stores/DictionaryStore";
import { useUserStore } from "~~/stores/UserStore";

const dictionaryStore = useDictionaryStore();
const post = await dictionaryStore.getWords();

const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);
const dictionaryWordRef = storeToRefs(dictionaryStore);
const wordList = dictionaryWordRef.words;

const currentPageCount = ref(1);
userStoreRef.prefs.value.wordsPerPage;

const totalPages = computed((): number => {
  return Math.ceil(
    wordList.value.length / userStoreRef.prefs.value.wordsPerPage
  );
});

const onlyShowFavorites = ref(false);
const filterText = ref("");

const filteredWordList = computed((): Word[] => {
  let wordArray: Word[] = [];

  const getFilteredWords = (words: Word[]) => {
    const filteredArray: Word[] = words.filter((word) => {
      if (
        word.fields.english
          .toLowerCase()
          .includes(filterText.value.toLowerCase())
      ) {
        return true;
      } else if (
        word.fields.navajo
          .toLowerCase()
          .includes(filterText.value.toLowerCase())
      ) {
        return true;
      } else if (
        word.fields.pagesConversation &&
        word.fields.pagesConversation.includes(filterText.value.toLowerCase())
      ) {
        return true;
      }
    });
    return filteredArray;
  };

  onlyShowFavorites.value == true
    ? (wordArray = getFilteredWords(userStoreRef.getFavoriteWords.value))
    : (wordArray = getFilteredWords(wordList.value));

  return wordArray.slice(
    (currentPageCount.value - 1) * userStoreRef.prefs.value.wordsPerPage,
    (currentPageCount.value - 1) * userStoreRef.prefs.value.wordsPerPage +
      userStoreRef.prefs.value.wordsPerPage
  );
});

const nextPage = (): void => {
  if (currentPageCount.value < totalPages.value) {
    currentPageCount.value++;
  }
};

const prevPage = (): void => {
  if (currentPageCount.value > 1) {
    currentPageCount.value--;
  }
};

const deSelectCurrentPage = (words: Word[]) => {
  for (let i = 0; i < words.length; i++) {
    userStore.unSelectWord(words[i]);
  }
};
const selectCurrentPage = (words: Word[]) => {
  for (let i = 0; i < words.length; i++) {
    userStore.selectWord(words[i]);
  }
};
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: opacity 1s ease-out, transform 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0.5;
  transform: translateX(5px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  visibility: hidden;
}
</style>
