<template>
    <nav class="flex flex-col space-y-1 py-2">
        <RouterLink
            v-for="entry in props.entries"
            :key="entry.name"
            :to="entry.to"
            rounded-lg flex py-2 items-center space-x-5 px-4 text-gray-800 hover="bg-gray-100"
            @click="toggleSidebar()"
        >
            <span :class="entry.icon" class="icon" w-5 h-5 />

            <span font-medium text-sm>
                {{ entry.name }}
            </span>
        </RouterLink>
    </nav>
</template>

<script lang="ts" setup>
    const props = defineProps({
        entries: Object
    });

    const { toggleSidebar } = useSidebar();
</script>

<style lang="scss" scoped>
    .router-link-exact-active{
        @apply bg-gray-100 text-gray-700;

        .icon{
            @apply text-red-500;
        }
    }
</style>
