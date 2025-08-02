import { apiSlice } from './apiSlice'
import { ORDER_URL, USERS_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: 'POST',
                body: {...order}
            })
        })
    })
})

export const {useCreateOrderMutation} = ordersApiSlice;