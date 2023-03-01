const useYoutube = () => {
    const subscriptions = useLocalStorage<any[]>("subscriptions", []);
    const userChannel = useLocalStorage<any>("userChannel", { userChannel: null });

    const getUserChannel = async () => {
        const { user } = useUser();

        const { data } = await useFetchYT(`channels?${new URLSearchParams({
            part: "snippet,statistics,contentDetails",
            mine: "true",
            key: import.meta.env.VITE_YT_API_KEY
        })}`, {
            headers: {
                Authorization: `Bearer ${user.value._tokenResponse.oauthAccessToken}`
            }
        }).get().json();

        userChannel.value = data.value.items[0];
    };

    const fetchSubscriptions = async () => {
        const { user } = useUser();

        const { data } = await useFetchYT(`subscriptions?${new URLSearchParams({
            part: "snippet,contentDetails,id,subscriberSnippet",
            mine: "true",
            maxResults: "50",
            key: import.meta.env.VITE_YT_API_KEY
        })}`, {
            headers: {
                Authorization: `Bearer ${user.value._tokenResponse.oauthAccessToken}`
            }
        }).get().json();

        subscriptions.value = data.value.items;
    };

    const getDislikes = async (videoId: string, likes: number) => {
        const { data } = await useFetch(`https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}&likeCount=${likes}`).get().json();
        return data.value.dislikes;
    };

    const isSubscribed = (channelId: string) => {
        return subscriptions.value.some((sub) => sub.snippet.resourceId.channelId === channelId);
    };

    return {
        subscriptions,
        userChannel,
        getUserChannel,
        fetchSubscriptions,
        isSubscribed,
        getDislikes
    };
};

export { useYoutube };
export default useYoutube;
