import {USERS_URL} from '../constants'
import {apiSlice} from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        loginGoogle: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/google`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        profile: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}/profile`,
                method: 'PUT',
                body:data,
            })
        }),
        // Admin endpoints
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const { 
    useLoginMutation, 
    useLoginGoogleMutation,
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} = usersApiSlice