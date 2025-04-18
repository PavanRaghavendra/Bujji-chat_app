import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import SERVER_API from '../../lib/consfig'

export const apiSilce=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${SERVER_API}/api/v1/`}),
    tagTypes:['getChats','nameSearch','messages'],
    endpoints:builder=>(
        {
            getChats:builder.query({
                query:()=>({
                    url:'chats/my',
                    method:'GET',
                    credentials:"include"
                }),
                providesTags:['getChats']
            }),
            nameSearch:builder.query({
                query:(name)=>(
                    {
                        url:`user/search?name=${name}`,
                        method:'GET',
                        credentials:"include"
                    }
                ),
                providesTags:['nameSearch']
            }),
            sendRequest:builder.mutation(
                {
                    query:(data)=>
                    ({
                        url:"user/sendrequest",
                        method:"PUT",
                        credentials:"include",
                        body:data
                    }),
                    invalidatesTags:["nameSearch"]
                }
            ),
            getnotification:builder.query(
                {
                    query:()=>(
                        {
                            url:'user/notification',
                            method:'get',
                            credentials:'include'
                        }
                    ),
                    keepUnusedDataFor:0,
                }
            ),
            acceptRequest:builder.mutation(
                {
                    query:(request)=>(
                    {
                        url:'user/acceptRequest',
                        method:'PUT',
                        credentials:'include',
                        body:(request)

                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            chatDetails: builder.query({
                query: ({ chatId, populate = false }) => {
                  let url = `chats/${chatId}`;
                  if (populate) url += "?populate=true";
                  return {
                    url,
                    credentials: "include",
                  };
                },
                providesTags: ["getChats"],
              }),
              getMessages:builder.query(
                {
                    query:({chatId,page})=>(
                        {
                            url:`chats/messages/${chatId}?page=${page}`,
                            method:'get',
                            credentials:'include'
                        }
                    ),
                    keepUnusedDataFor:0
                }
            ),
            sendAttachments:builder.mutation(
                {
                    query:(request)=>(
                    {
                        url:'chats/message',
                        method:'POST',
                        credentials:'include',
                        body:(request)

                    }),
                }
            ),
            allusers:builder.query(
                {
                    query:()=>
                    (
                        {
                        url:'user/allusers',
                        method:'GET',
                        credentials:"include"
                        }

                    )
                }
            ),
            createGroup:builder.mutation(
                {
                    query:(request)=>(
                    {
                        url:'chats/new',
                        method:'POST',
                        credentials:'include',
                        body:(request)

                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            getFriends: builder.query({
                query: (chatId) => {
                  let url = `user/friends`;
                  if (chatId) url += `?chatId=${chatId}`;
                  return {
                    url,
                    method:"Get",
                    credentials: "include",
                  };
                },
              }),
              getGroups:builder.query(
                {
                    query:()=>(
                        {
                            url:'chats/my/groups',
                            method:'GET',
                            credentials:'include',
                        }),
                        providesTags:["getChats"]
                }
              ),
              renameChat:builder.mutation(
                {
                    query:({chatId,name})=>
                    (
                        {
                        url:`chats/${chatId}`,
                        method:'PUT',
                        credentials:'include',
                        body:{name,chatId}
                        }

                    ),
                    invalidatesTags:["getChats"]
                }
            ),
            removeMembersGroup:builder.mutation(
                {
                    query:(request)=>(
                    {
                        url:'chats/removeMembers',
                        method:'DELETE',
                        credentials:'include',
                        body:(request)
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            addMembers:builder.mutation(
                {
                    query:(request)=>(
                    {
                        url:'chats/addMembers',
                        method:'PUT',
                        credentials:'include',
                        body:(request)
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            deleteGroup:builder.mutation(
                {
                    query:({chatId})=>({
                        url:`chats/${chatId}`,
                        method:'DELETE',
                        credentials:'include',
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            leaveGroup:builder.mutation(
                {
                    query:({chatId})=>({
                        url:`chats/leave/${chatId}`,
                        method:'DELETE',
                        credentials:'include',
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            makeAdmin:builder.mutation(
                {
                    query:(request)=>({
                        url:`chats/makeadmin`,
                        method:'PUT',
                        body:request,
                        credentials:'include',
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            removeAdmin:builder.mutation(
                {
                    query:(request)=>({
                        url:`chats/removeadmin`,
                        method:'PUT',
                        body:request,
                        credentials:'include',
                    }),
                    invalidatesTags:["getChats"]
                }
            ),
            dashboardStatus:builder.query(
                {
                    query:()=>(
                        {
                             url:"admin/dashboard",
                             method:"GET",
                             credentials:"include"
                        }
                    )
                }
            )
        })
});
export const {useGetChatsQuery,useLazyNameSearchQuery,useSendRequestMutation,useGetnotificationQuery
    ,useAcceptRequestMutation,useChatDetailsQuery,useGetMessagesQuery,useSendAttachmentsMutation,
    useAllusersQuery,useCreateGroupMutation,useGetFriendsQuery,useGetGroupsQuery,useRenameChatMutation
    ,useRemoveMembersGroupMutation,useAddMembersMutation,useDeleteGroupMutation,useLeaveGroupMutation,
    useMakeAdminMutation,useRemoveAdminMutation,useDashboardStatusQuery
}=apiSilce
export default apiSilce;