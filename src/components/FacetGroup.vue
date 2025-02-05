<template>
  <div class="facet-group">
    <ul>
      <FacetGroupItem
        v-for="item in items"
        :key="item"
        :id="item"
        :value="item"
        v-model="modelValueRef"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import FacetGroupItem from './FacetGroupItem.vue';

defineProps<{
  id: string;
  items: string[];
}>()

const modelValue = defineModel<string[]>({ required: true, default: () => [] })
const modelValueRef = toRef(modelValue)
</script>

<style scoped>
.facet-group {
  flex: 1;
}
.facet-group > ul {
  list-style-type: none;
  padding: 0;
}
</style>
