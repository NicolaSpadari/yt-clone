<template>
    <container>
        <p>Results for: <span font-bold italic>{{ $route.query.search_query }}</span></p>

        <div mt-10>
            <ul>
                <li v-for="video in videos" :key="video.id.videoId" mb-5>
                    <RouterLink :to="`/watch?v=${video.id.videoId}`">
                        {{ video.snippet.title }}
                    </RouterLink>
                </li>
            </ul>
        </div>

        <!-- <pre>{{ videos }}</pre> -->
    </container>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const videos = ref<any[]>([]);

    const { data } = await useFetchYT("search?" + new URLSearchParams({
        part: "snippet",
        q: route.query.search_query,
        maxResults: "50",
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    videos.value = data.value.items;
</script>
