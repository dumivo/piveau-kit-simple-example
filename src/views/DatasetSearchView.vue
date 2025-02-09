<script setup lang="ts">
import { type SearchParamsBase } from '@piveau/sdk-core'
import { computed, reactive, ref, toRefs } from 'vue'
import { useDatasetsSearch } from '../piveau/search'

// 👇 Query parameters
const categories = ref<string[]>([])
const queryParams: SearchParamsBase = reactive({
  q: '',
  limit: 10,
  page: 1,
  sort: 'title+asc',
})

// 👇 Create hub-search asynchronous state
const { useSearch } = useDatasetsSearch()
const {
  isFetching,
  getSearchResultsEnhanced,
  nextPage,
  previousPage,
  getSearchResultsPagesCount,
  getSearchResultsCount,
  getAvailableFacetsLocalized,
} = useSearch({
  // Will refetch whenever one of these change
  queryParams: toRefs(queryParams),
  selectedFacets: {
    categories,
  }
})

// 👇 Component-specific datamodels
const searchInput = ref('')
const onSearch = () => queryParams.q = searchInput.value

const availableFacetsEn = getAvailableFacetsLocalized('en')
const availableCategories = computed(() => availableFacetsEn.value.find((f) => f.id === 'categories'))
</script>

<template>
  <section class="two-column-layout">
    <div class="search-results">
      <input class="search" type="text" v-model="searchInput" @keyup.enter="onSearch" placeholder="Search datasets" />
      <div v-if="isFetching" class="is-fetching">
        Fetching...
      </div>
      <div v-else>
        Found {{ getSearchResultsCount }} datasets
        <hr>
        <ul class="dataset-list">
          <li v-for="dataset in getSearchResultsEnhanced" :key="dataset.getId">
            <RouterLink :to="{ name: 'dataset-details-view', params: { datasetId: dataset.getId } }">
              <div class="search-result-summary">
                <small>{{ dataset.getPublisher?.name }}</small>
                <h4>{{ dataset.getTitle }}</h4>
              </div>
            </RouterLink>
          </li>
        </ul>
        <hr>
      </div>
    </div>
    <div class="facets">
      <ul>
        <li v-for="facet in availableCategories?.items || []" :key="facet.id" class="">
          <label class="facet-group-item">
            <span>{{ facet.title }}</span>
            <input type="checkbox" :value="facet.id" class="" v-model="categories" >
          </label>
        </li>
      </ul>
    </div>
  </section>

  <section class="pagination">
    <button @click="previousPage">Decrement page</button>
    <span>Page {{ queryParams.page }} of {{ getSearchResultsPagesCount }}</span>
    <button @click="nextPage">Increment page</button>
  </section>
</template>

<style scoped>
.two-column-layout {
  flex: 1;
  display: flex;
  gap: 3rem;
  flex-wrap: nowrap;
}

.facets {
  width: 300px;
}

.is-fetching {
  display: grid;
  place-items: center;
  height: 100%;
  font-weight: bold;
}

.search-result-summary {
  display: flex;
  flex-direction: column;
}

.search-result-summary h4 {
  font-weight: bold;
}

.search-results {
  flex: 1;
}

.search {
  width: 100%;
  padding: 12px 20px;
  margin: 27px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.dataset-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}

.facet-group {
  flex: 1;
}

.facet-group > ul {
  list-style-type: none;
  padding: 0;
}

.facet-group-item {
  display: flex;
  justify-content: space-between;
}

hr {
  margin: 1rem 0;
}
</style>
