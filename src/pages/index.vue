<route>
{
    name: "Home"
}
</route>

<template>
    <div ref="container" pt-80px max-h-screen scrollbar="~ thumb-color-zinc-400 rounded">
        <div container grid gap-4 px-5 sm="grid-cols-2" lg="grid-cols-3" xl="grid-cols-4" xxl="grid-cols-5" uw="grid-cols-6">
            <template v-if="loading">
                Loading...
            </template>

            <template v-else>
                <VideoItem v-for="vid in videos" :key="vid.id" :data="vid" :channel-thumbnail="getChannelThumbnail(vid.id)" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const videos = ref<any[]>([]);
    const videoThumbnails = ref<any[]>([]);
    const container = ref<HTMLElement | null>(null);
    const nextPage = ref("");
    const loading = ref(true);

    useHead({
        title: String(route.name),
        meta: [
            {
                name: "description",
                content: "Homepage description"
            }
        ]
    });

    const fetchVideos = async () => {
        try {
            const { data, isFetching } = await useFetchYT("videos?" + new URLSearchParams({
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                maxResults: "50",
                pageToken: nextPage.value,
                key: import.meta.env.VITE_YT_API_KEY
            })).get().json();

            nextPage.value = data.value.nextPageToken;
            videos.value.push(...data.value.items);
            await fetchVideoThumbnails(data.value.items.map((video: any) => video.snippet.channelId));
            loading.value = isFetching.value;
        } catch (err) {
            console.error(err);
        }
    };

    const fetchVideoThumbnails = async (ids: string[]) => {
        try {
            const { data } = await useFetchYT("channels?" + new URLSearchParams({
                part: "snippet",
                id: ids.join(","),
                key: import.meta.env.VITE_YT_API_KEY
            })).get().json();

            videoThumbnails.value.push(...data.value.items);
        } catch (err) {
            console.error(err);
        }
    };

    const getChannelThumbnail = (videoId: string) => {
        return videos.value.find((video) => video.id === videoId)?.snippet.thumbnails.default.url;
    };

    onMounted(async () => {
        await fetchVideos();
    });

    useInfiniteScroll(container, async () => {
        await fetchVideos();
    });
</script>
