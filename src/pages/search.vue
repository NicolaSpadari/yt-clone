<template>
    <div container pt-80px>
        <p text-dark-800 text-xl mt-10>
            Results for: <span font-bold italic>{{ $route.query.search_query }}</span>
        </p>

        <div mt-10>
            <template v-for="video in videos">
                <ChannelItem v-if="video.id.kind === 'youtube#channel'" :key="video.id.videoId" :data="video" />
                <VideoItemHorizontal v-else :key="video.id.videoId" :data="video" />
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
