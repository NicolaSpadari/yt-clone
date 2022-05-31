<template>
    <nav class="flex flex-col space-y-1 py-2">
        <RouterLink
            v-for="channel in subscriptions"
            :key="channel.id"
            :to="`/channel/${channel.snippet.resourceId.channelId}`"
            rounded-lg flex py-2 items-center space-x-5
            text-gray-800 hover:bg-gray-100 px-4
        >
            <span w-6 h-6 rounded-full bg-gray-300 />

            <span v-show="isOpen" font-medium text-sm>
                {{ channel.snippet.title }}
            </span>
        </RouterLink>
    </nav>
</template>

<script lang="ts" setup>
    const { user } = useUser();
    const { isOpen } = useSidebar();
    const subscriptions = ref<any[]>([]);
    const loading = ref(true);

    const fetchSubscriptions = async () => {
        try {
            const { data, isFetching } = await useFetchYT("subscriptions?" + new URLSearchParams({
                part: "snippet,contentDetails,id,subscriberSnippet",
                mine: "true",
                maxResults: "50",
                key: import.meta.env.VITE_YT_API_KEY
            }), {
                headers: {
                    Authorization: `Bearer ${user.value._tokenResponse.oauthAccessToken}`
                }
            }).get().json();

            subscriptions.value.push(...data.value.items);
            loading.value = isFetching.value;
        } catch (err) {
            console.error(err);
        }
    };

    await fetchSubscriptions();
</script>
