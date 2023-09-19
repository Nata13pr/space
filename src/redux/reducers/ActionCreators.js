import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

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




export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://api.spacexdata.com/v5/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: ({ page }) => ({
                url: 'launches/query',
                method: 'POST',
                body: {
                    query: {},
                    options: {
                        page,
                        sort: {
                            date_utc: 'desc',
                        },
                    },
                },
            }),
        }),
    }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;