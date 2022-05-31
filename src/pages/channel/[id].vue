<template>
    <div>
        <p>Channel {{ $route.params.id }}</p>

        <img :src="channel.brandingSettings.image.bannerExternalUrl">

        <pre>{{ channel }}</pre>

        <pre>{{ videos }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const channel = ref();
    const channelVideos = ref<any[]>([]);

    const { data, error } = await useFetchYT("channels?" + new URLSearchParams({
        part: "brandingSettings,id,snippet,statistics",
        id: String(route.params.id),
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    const { data: videos, error: videosError } = await useFetchYT("search?" + new URLSearchParams({
        part: "id,snippet",
        channelId: String(route.params.id),
        maxResults: "50",
        order: "date",
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    channel.value = data.value.items[0];
    channelVideos.value = videos.value;

    useHead({
        title: channel.value.snippet.title
    });
</script>
