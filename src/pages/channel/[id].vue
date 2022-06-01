<template>
    <div space-y-10>
        <Banner :image="channel.brandingSettings.image.bannerExternalUrl" />

        <div rounded-lg p-6 bg-gray-50>
            <div flex justify-between>
                <div class="flex space-x-4 mt-3 items-start">
                    <img v-lazyload border-2 border-gray-200 :data-src="channel.snippet.thumbnails.medium.url" class="rounded-full h-16 w-16" :alt="channel.snippet.title">
                    <div class="text-sm">
                        <p class="font-semibold text-gray-800 text-2xl">
                            {{ channel.snippet.title }}
                        </p>
                        <div v-if="!channel.statistics.hiddenSubscriberCount" class="flex mt-1">
                            <div class="relative">
                                <div class="flex h-full items-center">
                                    <span>
                                        {{ formatNumber(channel.statistics.subscriberCount) }} subscribers
                                        ·
                                        {{ channel.statistics.videoCount }} videos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div flex items-center>
                    <RevealButton v-if="isSubscribed(channel.id)" bg-red-500 text-white>
                        <template #front>
                            <div flex space-x-3>
                                <span text-sm>
                                    Subscribed
                                </span>

                                <i-heroicons-solid-check w-5 h-5 />
                            </div>
                        </template>
                        <template #back>
                            <button flex space-x-3>
                                <span font-semibold text-sm>
                                    Unsubscribe
                                </span>

                                <i-heroicons-solid-x w-5 h-5 />
                            </button>
                        </template>
                    </RevealButton>

                    <RegularButton v-else bg-red-500 text-white>
                        <div flex space-x-3>
                            <span text-sm>
                                Subscribe
                            </span>

                            <i-heroicons-solid-plus w-5 h-5 />
                        </div>
                    </RegularButton>
                </div>
            </div>
        </div>

        <div ref="container" m-auto max-w-screen-2xl grid gap-4 sm="grid-cols-2" lg="grid-cols-3" xl="grid-cols-4" uw="grid-cols-5">
            <ChannelVideoItem v-for="vid in channelVideos" :key="vid.id.videoId" :data="vid" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useUtils } from "@/composables/useUtils";
    const route = useRoute();
    const { formatNumber } = useUtils();
    const { isSubscribed } = useYoutube();
    const channel = ref();
    const channelVideos = ref<any[]>([]);

    const { data, error } = await useFetchYT("channels?" + new URLSearchParams({
        part: "brandingSettings,id,snippet,statistics,contentDetails",
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
    channelVideos.value = videos.value.items;

    useHead({
        title: channel.value.snippet.title
    });
</script>
