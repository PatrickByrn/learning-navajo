<template>
  <div>
    <button @click="showPopup = true">Preferences</button>
    <div
      @click.self="showPopup = false"
      v-if="showPopup"
      class="h-full fixed top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full bg-slate-900/75"
    >
      <div class="container relative left-0 mx-auto translate-y-1/2">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex items-start justify -between p-4 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">Preferences</h3>
            <button
              @click="showPopup = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span @click.self="showPopup = false" class="sr-only"
                >Close modal</span
              >
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6">
            <p class="font-bold">Flash Card Front Preference:</p>
            <template v-for="(lang, index) in langPrefs" :key="index">
              <input
                type="radio"
                name="pref_language"
                :value="lang"
                class="mr-1 captialize"
                v-model="userStoreRef.prefs.value.flashCardPref"
              />
              <label class="ml-1 mr-4 capitalize">{{ lang }}</label>
            </template>
            <p class="pt-5 font-bold">Words Per-Page:</p>
            <input
              type="number"
              class="border rounded pl-2 p-1"
              min="1"
              step="1"
              v-model="userStoreRef.prefs.value.wordsPerPage"
            />
            <br />
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
          >
            <button
              @click.self="showPopup = false"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { langPrefs } from "~~/constants";
import { useUserStore } from "~~/stores/UserStore";

const showPopup = ref(false);

const userStore = "a";
const userStoreRef = storeToRefs(useUserStore());
</script>

<style scoped></style>
