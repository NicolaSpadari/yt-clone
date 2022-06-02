<template>
    <div container pt-100px space-y-5 px-5>
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

        <div container max-w-6xl space-y-10>
            <div flex justify-between>
                <div border-l-4 border-gray-400 pl-4 py-2 space-y-1>
                    <div flex space-x-4 items-center>
                        <RouterLink :to="`/channel/${channel.id}`">
                            <img v-lazyload rounded-full :data-src="channel.snippet.thumbnails.default.url" :alt="channel.brandingSettings.channel.title" w-16 h-16>
                        </RouterLink>
                        <div max-w-3xl>
                            <div flex items-center space-x-3>
                                <RouterLink :to="`/channel/${channel.id}`" font-medium text-base>
                                    {{ channel.brandingSettings.channel.title }}
                                </RouterLink>

                                <template v-if="!channel.statistics.hiddenSubscriberCount">
                                    <span>&middot;</span>
                                    <p text-gray-600 text-sm>
                                        {{ formatNumber(channel.statistics.subscriberCount) }} subscribers
                                    </p>
                                </template>
                            </div>
                            <p font-bold text-2xl>
                                {{ video.snippet.title }}
                            </p>
                            <div flex space-x-3 items-center>
                                <p text-sm text-gray-600>
                                    Published on {{ getPublishDate(video.snippet.publishedAt) }}
                                </p>
                                <span>&middot;</span>
                                <p text-gray-600 text-sm>
                                    {{ formatNumber(channel.statistics.viewCount) }} views
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div flex space-x-5 pr-10>
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

                    <div flex items-center>
                        <button @click="shareVideo($route.query.v);showAlert('Url copied')">
                            <i-heroicons-outline-share w-5 h-5 text-gray-600 />
                        </button>
                    </div>
                </div>
            </div>

            <div class="rich-text">
                <p max-w-4xl text-sm text-dark-600 v-html="enrichText(video.snippet.description)" />
            </div>
        </div>

        <div>
            <VideoComments :video-id="$route.query.v" :count="video.statistics.commentCount" mt-20 />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { showAlert } = useAlert();
    const { enrichText, dotNumber, formatNumber, shareVideo, getPublishDate } = useUtils();
    const { getDislikes } = useYoutube();
    const video = ref();
    const channel = ref();
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

    const { data: channelData } = await useFetchYT("channels?" + new URLSearchParams({
        part: "brandingSettings,id,snippet,statistics,contentDetails",
        id: video.value.snippet.channelId,
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();
    channel.value = channelData.value.items[0];

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
