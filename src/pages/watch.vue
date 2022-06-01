<template>
    <div container pt-80px space-y-5>
        <div rounded-lg overflow-hidden>
            <vue-plyr ref="plyr">
                <div class="plyr__video-embed">
                    <iframe
                        :src="`https://www.youtube.com/embed/${$route.query.v}?amp;iv_load_policy=3&amp;modestbranding=0&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    />
                </div>
            </vue-plyr>
        </div>

        <div container space-y-10>
            <div flex justify-between>
                <p font-bold text-2xl border-l-4 border-gray-400 pl-4 py-2>
                    {{ video.snippet.title }}
                </p>
                <div flex space-x-5>
                    <div flex items-center space-x-2>
                        <i-heroicons-outline-thumb-up w-5 h-5 text-gray-600 />
                        <p text-sm text-gray-500 font-semibold>
                            {{ dotNumber(video.statistics.likeCount) }}
                        </p>
                    </div>

                    <div flex items-center space-x-2>
                        <i-heroicons-outline-thumb-down w-5 h-5 text-gray-600 />
                        <p text-sm text-gray-500 font-semibold>
                            {{ dotNumber(dislikes) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rich-text">
                <p max-w-4xl text-sm text-dark-600 v-html="enrichText(video.snippet.description)" />
            </div>

            <div flex space-x-5>
                <RouterLink v-for="hashtag in video.snippet.tags" :key="hashtag" :to="`/search?search_query=${hashtag}`" text-blue-600 text-sm>
                    #{{ hashtag }}
                </RouterLink>
            </div>
        </div>

        <div>
            <VideoComments :video-id="$route.query.v" :count="video.statistics.commentCount" mt-20 />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { enrichText, dotNumber } = useUtils();
    const { getDislikes } = useYoutube();
    const video = ref();
    const plyr = ref<HTMLElement | null>(null);
    const player = ref();
    const dislikes = ref(0);

    onMounted(() => {
        player.value = plyr.value.player;

        setTimeout(() => {
            player.value.play();
        }, 1000);
    });

    const { data } = await useFetchYT("videos?" + new URLSearchParams({
        part: "id,snippet,statistics",
        id: String(route.query.v),
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();
    video.value = data.value.items[0];

    dislikes.value = await getDislikes(String(route.query.v), Number(video.value.statistics.likeCount));

    useHead({
        title: video.value.title
    });

    useEventListener(document, "keydown", (e) => {
        if (e.code === "Space" && e.target === document.body) {
            e.preventDefault();
        }
    });

    useEventListener(document, "keyup", (e) => {
        if (e.code === "Space") {
            player.value.togglePlay();
        }
    });
</script>

<style>
    .rich-text a{
        @apply text-blue-600 underline;
    }
</style>
