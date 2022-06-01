<template>
    <div space-y-10>
        <Banner :image="channel.brandingSettings.image.bannerExternalUrl" />

        <ChannelHeading :channel="channel" />

        <div ref="container" m-auto max-w-screen-2xl grid gap-4 sm="grid-cols-2" lg="grid-cols-3" xl="grid-cols-4" uw="grid-cols-5">
            <ChannelVideoItem v-for="vid in channelVideos" :key="vid.id.videoId" :data="vid" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const channel = ref();
    const channelVideos = ref<any[]>([]);

    const { data } = await useFetchYT("channels?" + new URLSearchParams({
        part: "brandingSettings,id,snippet,statistics,contentDetails",
        id: String(route.params.id),
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    const { data: videos } = await useFetchYT("search?" + new URLSearchParams({
        part: "id,snippet",
        channelId: String(route.params.id),
        maxResults: "50",
        order: "date",
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    channel.value = data.value.items[0];
    channelVideos.value = videos.value.items;

    useHead({
        title: channel.value.snippet.title
    });
</script>
