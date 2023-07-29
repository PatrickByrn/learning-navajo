import { useStorage } from '@vueuse/core';
import { merge } from 'lodash';
import { defineStore } from 'pinia';
import type { Word, langPref } from '~~/types';
import { useDictionaryStore } from './DictionaryStore';

type userPrefs = {
  flashCardPref: langPref
  wordsPerPage: number
  userName?: string
}

const defaultUserPrefs: userPrefs = {
  flashCardPref: 'navajo',
  wordsPerPage: 20
}

type userWords = {
  id: string
  favorite?: boolean
  selected?: boolean 
}

export const useUserStore = defineStore('UserStore', {
  state:  () => ({
    prefs: useStorage<userPrefs>('learn-nav-prefs', defaultUserPrefs, localStorage,
    { mergeDefaults: (storageValue, defaults) => merge(defaults, storageValue) }),
    words: useStorage<userWords[]>('learn-nav-user-words', [], localStorage),
  }),
  getters:{
    getSelectedWords: (state): Word[] => {
      let wordArray = []

      const dictionary = useDictionaryStore()

      wordArray = dictionary.words.filter(o1 => state.words.some(o2 => o1.id === o2.id && o2.selected))
      return wordArray;
    },
    getFavoriteWords: (state): Word[] => {
      let wordArray = []

      const dictionary = useDictionaryStore()

      wordArray = dictionary.words.filter(o1 => state.words.some(o2 => o1.id === o2.id && o2.favorite))
      return wordArray;
    }
  },
  actions: {
    favoriteWord(word: Word):void {
      const indexOfSelectedWord = this.words.findIndex(o => o.id === word.id);

      if ( indexOfSelectedWord === -1) {
        this.words.push(
          {
            id: word.id,
            favorite: true
          }
        )
      } else{
        this.words[indexOfSelectedWord].favorite = true;
      }
    },
    unFavoriteWord(word: Word):void {
      const indexOfSelectedWord = this.words.findIndex(o => o.id === word.id);

      if ( indexOfSelectedWord !== -1) {
        this.words[indexOfSelectedWord].favorite = false;
      } 
    },
    selectWord(word: Word):void {
      const indexOfSelectedWord = this.words.findIndex(o => o.id === word.id);

      if ( indexOfSelectedWord === -1) {
        this.words.push(
          {
            id: word.id,
            selected: true
          }
        )
      } else{
        this.words[indexOfSelectedWord].selected = true;
      }
    },
    unSelectWord(word: Word):void {
      const indexOfSelectedWord = this.words.findIndex(o => o.id === word.id);
      console.log("unselected" + word.fields.english)
      console.table(this.$state.words)
      if ( indexOfSelectedWord !== -1) {
        this.words[indexOfSelectedWord].selected = false;
      } 
    }
  }
})