
import data from '@/src/content/words/words.json';
import type { Word } from '@/types';
import { useStorage } from '@vueuse/core';
import { merge } from 'lodash';
import { defineStore } from 'pinia';

const dataWords: Word[] = data.words

export const useDictionaryStore = defineStore('DictionaryStore', {
  state:  () => ({
    words: useStorage<Word[]>('word-dictionary', dataWords, localStorage,
    { mergeDefaults: (storageValue, defaults) => merge(storageValue, defaults) })
  }),
  getters: {
    totalNumberOfWords: (state) => {
      return state.words.length
    }
  },
  actions: {
    async getWords(){
      return this.words;
    }
  }
})