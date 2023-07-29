<template>
  <div
    class="h-full container mx-auto flex items-center justify-center flex-wrap"
  >
    <!-- Only displayed if there are selected words -->
    <div v-if="userStoreRef.getSelectedWords.value.length > 0">
      <div
        class="border px-2 pt-10 pb-5 rounded flex items-center justify-center flex-wrap"
        id="flashcard-body"
      >
        <div class="basis-full flex items-center justify-center flex-wrap py-5">
          <div v-show="showFrontSide">
            {{
              currentFlashCard.fields[
                `${userStoreRef.prefs.value.flashCardPref}`
              ]
            }}
          </div>
          <div v-show="!showFrontSide">
            {{ currentFlashCard.fields[`${backSidePreference}`] }}
          </div>
        </div>
        <div
          id="flashcard-interactions"
          class="flex flex-wrap items-center justify-center"
        >
          <AudioPlayer
            class="p-1 basis-full"
            v-if="currentFlashCard.fields.audioFileName"
            :audio-file-name="currentFlashCard.fields.audioFileName"
          ></AudioPlayer>
          <button
            @click="showFrontSide = !showFrontSide"
            class="group p-1 flex justify-center items-center hover:bg-slate-100 rounded transition-colors"
          >
            <Icon
              class="text-slate-700 transition-color"
              name="mdi:rotate-left"
            />
          </button>
          <button
            v-show="!showFrontSide"
            @click="removeFlashcard"
            class="group p-1 flex justify-center items-center hover:bg-slate-100 rounded transition-colors"
          >
            <Icon
              class="text-slate-700 group-hover:text-emerald-500 transition-colors"
              name="mdi:thumb-up"
            />
          </button>
        </div>
      </div>
      <p class="mx-auto flex justify-center items-center">
        {{ currentFlashCardIndex + 1 }} of
        {{ userStoreRef.getSelectedWords.value.length }}
      </p>
      <div id="flashcard-nav" class="mx-auto flex justify-center items-center">
        <button
          @click="showPreviousFlashcard"
          class="group border px-2 py-2 m-1 rounded hover:bg-slate-100"
        >
          <Icon name="mdi:arrow-left" class="text-slate-700 transition-color" />
        </button>
        <button
          @click="getRandomFlashCardIndex"
          class="group border px-2 py-2 m-1 rounded hover:bg-slate-100"
        >
          <Icon
            name="mdi:shuffle-variant"
            class="text-slate-700 transition-color"
          />
        </button>
        <button
          @click="showNextFlashcard"
          class="group border px-2 py-2 m-1 rounded hover:bg-slate-100"
        >
          <Icon
            name="mdi:arrow-right"
            class="text-slate-700 transition-color"
          />
        </button>
      </div>
    </div>
    <div v-else class="border">
      <p>Add some more words!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AudioPlayer from "@/components/AudioPlayer.vue";
import { storeToRefs } from "pinia";
import { langPrefs } from "~~/constants";
import { useUserStore } from "~~/stores/UserStore";

const userStore = useUserStore();

const userStoreRef = storeToRefs(userStore);

const showFrontSide = ref(true);
const currentFlashCardIndex = ref(0);

const backSidePreference = computed(() => {
  return userStoreRef.prefs.value.flashCardPref == langPrefs[0]
    ? langPrefs[1]
    : langPrefs[0];
});

const currentFlashCard = computed(() => {
  return userStoreRef.getSelectedWords.value[currentFlashCardIndex.value];
});

const getRandomFlashCardIndex = () => {
  const previousIndex = currentFlashCardIndex.value;

  const maxIndex = userStoreRef.getSelectedWords.value.length - 1;
  let randomIndex = Math.round(Math.random() * (0 - maxIndex) + maxIndex);

  do {
    randomIndex = Math.round(Math.random() * (0 - maxIndex) + maxIndex);
  } while (previousIndex == randomIndex);

  showFrontSide.value = true;
  return (currentFlashCardIndex.value = randomIndex);
};

const showNextFlashcard = () => {
  const maxIndex = userStoreRef.getSelectedWords.value.length - 1;
  currentFlashCardIndex.value++;

  if (currentFlashCardIndex.value > maxIndex) {
    currentFlashCardIndex.value = 0;
  }

  showFrontSide.value = true;
};

const showPreviousFlashcard = () => {
  const maxIndex = userStoreRef.getSelectedWords.value.length - 1;
  currentFlashCardIndex.value--;

  if (currentFlashCardIndex.value < 0) {
    currentFlashCardIndex.value = maxIndex;
  }

  showFrontSide.value = true;
};

const removeFlashcard = () => {
  userStore.unSelectWord(currentFlashCard.value);
  if (userStoreRef.getSelectedWords.value.length > 0) {
    showNextFlashcard();
  }
  showFrontSide.value = true;
};
</script>

<style scoped></style>
