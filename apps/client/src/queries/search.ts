import type {
  FilterRequestTypes,
  SearchResultTypes,
} from '@/types/filters.types';
import { apiGet } from '@/utils/api';
import { URL_ENDPOINTS } from '@/utils/constants';

export const fetchSearchResult = async ({
  filters,
}: {
  filters: FilterRequestTypes;
}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, values]) => {
      if (values?.length) params.set(key, values.join(','));
    });
    const query = params.toString();
    const url = query
      ? `${URL_ENDPOINTS.search}?${query}`
      : URL_ENDPOINTS.search;
    const result = await apiGet<SearchResultTypes>(url);

    if (!result) throw new Error('Failed to fetch search results');

    return result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
