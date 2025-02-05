<script setup lang="ts">
import { schemaDataset, type SearchParamsBase } from '@piveau/sdk-core'
import { defineHubSearch, dcatApDataset, } from '@piveau/sdk-vue'
import { computed, reactive, ref, toRefs } from 'vue'
import FacetGroup from './components/FacetGroup.vue'
import SearchResultSummary from './components/SearchResultSummary.vue'

// 👇 Your hub-search definition here
function useDatasetsSearch() {
  return defineHubSearch({
    baseUrl: 'https://demo.piveau.io/api/hub/search',
    index: 'dataset',
    indexDetails: 'datasets',
    facets: ['categories', 'publisher', 'catalog', 'format', 'license'],
    schema: schemaDataset,
  },
  dcatApDataset().setup
)}

const categories = ref([])

// 👇 Query parameters
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
  getFacetById
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

const availableCategories = getFacetById('categories')
const categoriesId = computed(() => availableCategories.value?.items.map((c) => c.id) || [])

</script>

<template>
  <main class="search-page">
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
              <SearchResultSummary :title="dataset.getTitle || ''" :publisher="dataset.getPublisher?.name || ''" />
            </li>
          </ul>
          <hr>
        </div>
      </div>
      <div class="facets">
        <FacetGroup id="categories" :items="categoriesId" v-model="categories" />
      </div>
    </section>

    <section class="pagination">
      <button @click="previousPage">Decrement page</button>
      <span>Page {{ queryParams.page }} of {{ getSearchResultsPagesCount }}</span>
      <button @click="nextPage">Increment page</button>
    </section>
  </main>
</template>

<style scoped>

.search-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 3rem;
}

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
  /* margin: 2.5rem 0; */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}

hr {
  margin: 1rem 0;
}
</style>
