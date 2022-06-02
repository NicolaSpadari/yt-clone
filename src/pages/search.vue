<template>
    <div container max-w-5xl pt-100px>
        <p v-if="$route.query.search_query" text-3xl text-dark-800 sm="text-4xl" mt-10>
            Results for: <span font-bold italic>{{ $route.query.search_query }}</span>
        </p>

        <div v-else mx-auto max-w-xl text-center space-y-4 mt-10>
            <p font-bold text-2xl sm="text-3xl">
                Search something
            </p>

            <p mx-auto text-gray-500>
                Type your search terms in the search bar above and press enter.
            </p>
        </div>

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

    const fetchResults = async () => {
        const { data } = await useFetchYT("search?" + new URLSearchParams({
            part: "snippet",
            q: String(route.query.search_query),
            maxResults: "50",
            key: import.meta.env.VITE_YT_API_KEY
        })).get().json();

        videos.value = data.value.items;
    };

    if (route.query.search_query && route.query.search_query !== "") {
        await fetchResults();
    }
</script>
