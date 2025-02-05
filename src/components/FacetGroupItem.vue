<template>
  <li class="">
    <label class="facet-group-item">
      <span>{{ props.value }}</span>
      <input type="checkbox" :value="props.value || props.id" class="" v-model="modelValue" >
    </label>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  value: string;
}>()

const modelValue = defineModel<string[]>()
</script>

<style>
.facet-group-item {
  display: flex;
  justify-content: space-between;
}
</style>
