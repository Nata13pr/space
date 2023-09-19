import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';


const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }




export const spaceApi = createApi({
    reducerPath: 'spaceApi',//'pokemonApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    endpoints: (builder) => ({
        getSpaceByName: builder.query({
            query: ( page ) => ({
                url: 'launches/query',
                method: 'POST',
                data: {
                    'query': {},
                    'options': {
                        page,
                        'sort': {
                            date_utc: 'desc',
                        },
                    },
                },
            }),
        }),
    }),
});

export const { useGetSpaceByNameQuery } = spaceApi//pokemonApi;