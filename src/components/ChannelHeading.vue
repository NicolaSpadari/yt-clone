<template>
    <div rounded-lg p-6 bg-gray-50>
        <div flex flex-col justify-between space-y-5 lg="flex-row space-y-0">
            <div class="flex space-x-4 mt-3 items-start">
                <img v-lazyload border-2 border-gray-200 shadow-md :data-src="props.channel.snippet.thumbnails.medium.url" class="rounded-full h-16 w-16" :alt="props.channel.snippet.title">
                <div class="text-sm">
                    <p class="font-semibold text-gray-800 text-2xl">
                        {{ escape(props.channel.snippet.title) }}
                    </p>
                    <div v-if="!props.channel.statistics.hiddenSubscriberCount" class="flex mt-1">
                        <div class="relative">
                            <div class="flex h-full items-center">
                                <span>
                                    {{ formatNumber(props.channel.statistics.subscriberCount) }} subscribers
                                    ·
                                    {{ props.channel.statistics.videoCount }} videos
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div flex justify-center items-center>
                <RevealButton v-if="isSubscribed(props.channel.id)" bg-red-500 text-white>
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
</template>

<script lang="ts" setup>
    const props = defineProps({
        channel: Object
    });

    const { formatNumber, escape } = useUtils();
    const { isSubscribed } = useYoutube();
</script>
