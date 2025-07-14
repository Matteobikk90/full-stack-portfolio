import axiosGet from '@/config/axios';
import type {
  FilterRequestTypes,
  SearchResultTypes,
} from '@/types/filters.types';
import { URL_ENDPOINTS } from '@/utils/constants';
import qs from 'query-string';

export const fetchSearchResult = async ({
  filters,
}: {
  filters: FilterRequestTypes;
}) => {
  try {
    const result = await axiosGet<SearchResultTypes>(URL_ENDPOINTS.search, {
      params: filters,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'comma' }),
    });

    if (!result) throw new Error('Failed to fetch search results');

    return result.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
