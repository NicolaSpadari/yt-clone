<template>
    <div ref="container" pt-100px max-h-screen scrollbar="~ thumb-color-zinc-400 rounded">
        <div container space-y-10>
            <Banner v-if="channel.brandingSettings.image" :image="channel.brandingSettings.image.bannerExternalUrl" />

            <ChannelHeading :channel="channel" />

            <div ref="container" m-auto max-w-screen-2xl grid gap-4 sm="grid-cols-2" lg="grid-cols-3" xl="grid-cols-4" uw="grid-cols-5">
                <template v-for="vid in channelVideos" :key="vid.id.videoId">
                    <ChannelVideoItem v-if="vid.id.kind === 'youtube#video'" :data="vid" />
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const container = ref<HTMLElement | null>(null);
    const channel = ref();
    const channelVideos = ref<any[]>([]);
    const pageToken = ref("");

    const { data } = await useFetchYT("channels?" + new URLSearchParams({
        part: "brandingSettings,id,snippet,statistics,contentDetails",
        id: String(route.params.id),
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();
    channel.value = data.value.items[0];

    const fetchVideos = async () => {
        const { data } = await useFetchYT("search?" + new URLSearchParams({
            part: "id,snippet",
            channelId: String(route.params.id),
            maxResults: "50",
            order: "date",
            pageToken: pageToken.value,
            key: import.meta.env.VITE_YT_API_KEY
        })).get().json();
        pageToken.value = data.value.nextPageToken;
        channelVideos.value.push(...data.value.items);
    };

    useHead({
        title: channel.value.snippet.title
    });

    onMounted(async () => {
        await fetchVideos();
    });

    useInfiniteScroll(container, async () => {
        await fetchVideos();
    });
</script>
