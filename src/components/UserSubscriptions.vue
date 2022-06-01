<template>
    <div py-2>
        <details class="group" space-y-1>
            <summary cursor-pointer rounded-lg flex py-2 items-center space-x-5 text-gray-800 hover:bg-gray-100 :class="isOpen ? 'pr-4 pl-6' : 'px-4'">
                <i-heroicons-solid-chart-bar w-5 h-5 />

                <span v-show="isOpen" font-medium text-sm>
                    Subscriptions
                </span>

                <i-heroicons-solid-chevron-right v-show="isOpen" w-5 h-5 transition-transform duration-250 class="group-open:rotate-90" />
            </summary>

            <RouterLink
                v-for="channel in subscriptions"
                :key="channel.id"
                :to="`/channel/${channel.snippet.resourceId.channelId}`"
                rounded-lg flex py-2 items-center space-x-5
                text-gray-800 hover:bg-gray-100
                :class="isOpen ? 'pr-4 pl-6' : 'px-4'"
            >
                <img v-lazyload w-6 h-6 rounded-full :data-src="channel.snippet.thumbnails.default.url" :alt="channel.snippet.title">

                <span v-show="isOpen" font-medium text-sm>
                    {{ channel.snippet.title }}
                </span>
            </RouterLink>
        </details>
    </div>
</template>

<script lang="ts" setup>
    const { subscriptions, fetchSubscriptions } = useYoutube();
    const { isOpen } = useSidebar();

    if (subscriptions.value.length === 0) {
        await fetchSubscriptions();
    }
</script>
