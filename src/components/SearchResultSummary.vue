<script setup lang="ts">
defineProps<{
  title: string;
  publisher?: string;
}>()
</script>

<template>
  <div class="search-result-summary">
    <small>{{ publisher }}</small>
    <h4>{{ title }}</h4>
  </div>
</template>

<style>
.search-result-summary {
  display: flex;
  flex-direction: column;
}

.search-result-summary h4 {
  font-weight: bold;
}
</style>
