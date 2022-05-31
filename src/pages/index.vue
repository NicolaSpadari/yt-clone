<route>
{
    name: "Home"
}
</route>

<template>
    <div ref="container" m-auto max-w-screen-2xl grid gap-4 sm="grid-cols-2" lg="grid-cols-3" xl="grid-cols-4" uw="grid-cols-5">
        <VideoItem v-for="vid in videos" :key="vid.id" :data="vid" />
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const videos = ref<any[]>([]);
    const container = ref<HTMLElement | null>(null);
    const nextPage = ref("");

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
            const { data } = await useFetchYT("videos?" + new URLSearchParams({
                part: "snippet,contentDetails",
                chart: "mostPopular",
                maxResults: "50",
                pageToken: nextPage.value,
                key: import.meta.env.VITE_YT_API_KEY
            })).get().json();

            nextPage.value = data.value.nextPageToken;
            videos.value.push(...data.value.items);
        } catch (err) {
            console.error(err);
        }
    };

    onMounted(() => fetchVideos());

    useInfiniteScroll(container, async () => {
        console.log("trigger infinite scroll");

        fetchVideos();
    });
</script>
