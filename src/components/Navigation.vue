<template>
    <nav class="flex flex-col space-y-1 py-2">
        <RouterLink
            v-for="entry in props.entries"
            :key="entry.name"
            :to="entry.to"
            rounded-lg flex py-2 items-center space-x-5
            :class="[entry.active ? 'bg-gray-100 text-gray-700' : 'text-gray-800 hover:bg-gray-100', open ? 'pr-4 pl-6' : 'px-4']"
        >
            <span w-5 h-5 :class="entry.active ? `text-red-500 ${entry.icon}` : entry.icon" />

            <span v-show="open" font-medium text-sm>
                {{ entry.name }}
            </span>
        </RouterLink>
    </nav>
</template>

<script lang="ts" setup>
    const { open } = useSidebar();

    const props = defineProps({
        entries: Object
    });
</script>
