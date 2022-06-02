<template>
    <div container pt-100px>
        <p text-3xl text-dark-800 sm="text-4xl">
            Results for: <span font-bold italic>{{ $route.query.search_query }}</span>
        </p>

        <div mt-10 space-y-10>
            <template v-for="video in videos" :key="video.id.videoId">
                <ChannelItem v-if="video.id.kind === 'youtube#channel'" :data="video" />
                <VideoItemHorizontal v-if="video.id.kind === 'youtube#video'" :data="video" />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const videos = ref<any[]>([]);

    const { data } = await useFetchYT("search?" + new URLSearchParams({
        part: "snippet",
        q: String(route.query.search_query),
        maxResults: "50",
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    videos.value = data.value.items;
</script>
