import { schemaDataset } from "@piveau/sdk-core";
import { dcatApDataset, defineHubSearch } from "@piveau/sdk-vue";

/**
 * Returns a piveau hub-search query definition for DCAT-AP datasets
 */
export function useDatasetsSearch() {
  return defineHubSearch({
    baseUrl: 'https://demo.piveau.io/api/hub/search',
    index: 'dataset',
    indexDetails: 'datasets',
    facets: ['categories', 'publisher', 'catalog', 'format', 'license'],
    schema: schemaDataset,
  },
  dcatApDataset().setup
)}
