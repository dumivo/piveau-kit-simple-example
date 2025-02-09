<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDatasetsSearch } from '../piveau/search'
import { computed } from 'vue';

const route = useRoute()
const datasetId = computed(() => route.params.datasetId as string)

const { useResource } = useDatasetsSearch()
const { isSuccess, resultEnhanced } = useResource(datasetId)
</script>

<template>
  <div class="dataset-details-page">
    <div v-if="isSuccess">
      <h1>{{ resultEnhanced?.getTitle }}</h1>
      <section class="dataset-description">
        <hr>
        <p>{{ resultEnhanced?.getDescription }}</p>
        <hr>
      </section>
      <section class="dataset-distributions">
        <h2>Distributions</h2>
        <div class="distributions-list">
          <div class="distribution-card" v-for="distribution in resultEnhanced?.getDistributions" :key="distribution.id">
            <h3>{{ distribution.title }}</h3>
            <p>{{ distribution.description }}</p>
            <ul v-if="distribution.accessUrls.length > 0" class="distribution-access-urls">
              <li><a v-for="(link, i) in distribution.accessUrls" :key="`accessUrl@${i}`" :href="link" target="_blank">{{ link }}</a></li>
            </ul>
            <ul v-if="distribution.downloadUrls.length > 0" class="distribution-download-urls">
              <li><a v-for="(link, i) in distribution.downloadUrls" :key="`downloadUrl@${i}`" :href="link" target="_blank">{{ link }}</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
.dataset-details-page {
  max-width: 75ch;
}

.dataset-description {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2.5rem 0;
}

.distributions-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.dataset-distributions {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2.5rem 0;
}
</style>
