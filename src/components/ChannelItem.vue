<template>
    <article rounded-lg border-1 border-gray-100 p-4 sm="p-8">
        <div flex items-center space-x-4 lg="items-start space-x-8">
            <RouterLink
                :to="`/channel/${props.data.id.channelId}`"
                rounded-full h-26 grid w-26 place-content-center shrink-0
            >
                <img v-lazyload rounded-full :data-src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" :alt="props.data.snippet.title">
            </RouterLink>

            <div>
                <RouterLink :to="`/channel/${props.data.id.channelId}`" font-medium text-lg lg="text-xl">
                    {{ shorten(props.data.snippet.title, 60) }}
                </RouterLink>

                <p v-if="props.data.snippet.description !== ''" mt-1 text-sm text-gray-700>
                    {{ props.data.snippet.description }}
                </p>

                <div mt-2 flex gap-2 lg="items-center mt-4">
                    <div flex flex-col text-gray-500 space-y-2 lg="flex-row">
                        <i-heroicons-solid-desktop-computer hidden w-4 h-4 text-red-500 lg="inline-block" />
                        <p font-medium text-xs lg="ml-1">
                            Member since {{ getReadableDate(props.data.snippet.publishedAt) }}
                        </p>
                        <div mr-auto lg="hidden">
                            <i-heroicons-solid-desktop-computer w-6 h-6 text-red-500 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
    const props = defineProps({
        data: Object,
        channelThumbnail: String
    });

    const { shorten, getReadableDate } = useUtils();
</script>
