import { langPrefs } from "./constants"

export  type Word = {
  id: string
  createdTime: string
  fields: {
    audioFileName: string
    navajo: string
    english: string
    pagesConversation?: string | undefined
    tags?: string | undefined
    selected?: boolean
  }
}

export type langPref = typeof langPrefs[number];