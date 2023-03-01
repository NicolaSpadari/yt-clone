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

            <div items-center justify-end py-2.5 px-7 flex-1 lg="hidden" max-w-screen-xs mt-5>
                <div relative flex-1>
                    <label sr-only for="search"> Search </label>

                    <input
                        id="search"
                        v-model="searchTerm"
                        w-full py-2 pl-3 pr-16 text-sm border-1 border-gray-200
                        rounded-lg
                        type="text"
                        placeholder="Search"
                        spellcheck="false"
                        @keyup.enter="search()"
                    >

                    <button i-heroicons-outline-search absolute p-2 text-white translate-y="-1/2" bg-blue-600 rounded-full top="1/2" right-4 type="button" />
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div v-show="!loading" mt-10 space-y-10>
                <template v-for="video in videos" :key="video.id.videoId">
                    <ChannelItem v-if="video.id.kind === 'youtube#channel'" :data="video" />
                    <VideoItemHorizontal v-if="video.id.kind === 'youtube#video'" :data="video" />
                </template>
            </div>
        </Transition>

        <Loader v-show="loading" />
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const videos = ref<any[]>([]);
    const searchTerm = ref("");
    const loading = ref(false);

    const userSearch = computed(() => route.query.search_query);

    const fetchResults = async (query: string) => {
        loading.value = true;
        const { data } = await useFetchYT(`search?${new URLSearchParams({
            part: "snippet",
            q: query,
            maxResults: "50",
            key: import.meta.env.VITE_YT_API_KEY
        })}`).get().json();

        videos.value = data.value.items;
        loading.value = false;
    };

    const search = async () => {
        await fetchResults(searchTerm.value);
    };

    if (route.query.search_query && route.query.search_query !== "") {
        await fetchResults(String(route.query.search_query));
    }

    watch(userSearch, (val) => {
        if (val && val !== "") {
            fetchResults(String(val));
        }
    });
</script>
