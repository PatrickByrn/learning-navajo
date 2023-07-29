<template>
  <div class="h-full">
    <nav class="container mx-auto flex flex-wrap items-center">
      <NuxtLink
        to="/"
        activeClass="text-emerald-900 font-bold"
        class="hover:text-emerald-900 text-lg p-2"
      >
        Words
      </NuxtLink>
      <NuxtLink
        to="/flashcards"
        activeClass="text-emerald-900 font-bold "
        class="hover:text-emerald-900 text-lg p-2 flex items-center"
      >
        Flash Cards
        <span
          class="inline-block text-xs rounded bg-emerald-900 text-white p-2 ml-1"
          >{{ userStore.getSelectedWords.length }}</span
        ></NuxtLink
      >
      <NuxtLink
        to="/about"
        activeClass="text-emerald-900 font-bold "
        class="hover:text-emerald-900 text-lg p-2 flex"
      >
        About & FAQ
      </NuxtLink>
      <PrefPopup class="hover:text-emerald-900 text-lg p-2" />
    </nav>
    <div class="h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/UserStore";

const userStore = useUserStore();
</script>

<style>
body {
  height: 100%;
}
</style>
