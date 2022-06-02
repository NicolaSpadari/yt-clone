<template>
    <nav class="flex flex-col space-y-1 py-2">
        <details class="group">
            <summary
                class="rounded-lg cursor-pointer flex py-2 px-4 text-gray-700 items-center hover:bg-gray-100 hover:text-gray-700"
            >
                <i-heroicons-solid-chart-bar w-5 h-5 />

                <span class="font-medium text-sm ml-5">
                    Subscriptions
                    <span text-xs font-normal>({{ subscriptions.length }})</span>
                </span>

                <span
                    class="ml-auto transition duration-300 shrink-0"
                >
                    <i-heroicons-solid-chevron-right w-5 h-5 transition-transform duration-250 class="group-open:rotate-90" />
                </span>
            </summary>

            <nav flex flex-col mt-1.5 :class="isOpen ? 'ml-8' : ''">
                <RouterLink
                    v-for="channel in subscriptions"
                    :key="channel.id"
                    :to="`/channel/${channel.snippet.resourceId.channelId}`"
                    class="rounded-lg flex py-2 px-4 text-gray-500 items-center hover:bg-gray-100 hover:text-gray-700"
                >
                    <img v-lazyload w-5 h-5 rounded-full :data-src="channel.snippet.thumbnails.default.url" :alt="channel.snippet.title">

                    <span class="font-medium text-sm ml-3"> {{ channel.snippet.title }} </span>
                </RouterLink>
            </nav>
        </details>
    </nav>
</template>

<script lang="ts" setup>
    const { subscriptions, fetchSubscriptions } = useYoutube();
    const { isOpen } = useSidebar();

    if (subscriptions.value.length === 0) {
        await fetchSubscriptions();
    }
</script>
