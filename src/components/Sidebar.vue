<template>
    <aside h-screen overflow-auto fixed top-0 bg-white z-20 divide-y divide-gray-200 :class="{ 'w-64': open }">
        <div pt-25>
            <Navigation :entries="firstEntries" />
            <Navigation :entries="secondEntries" />
        </div>
    </aside>
</template>

<script lang="ts" setup>
    const { open } = useSidebar();

    const firstEntries = [
        {
            name: "Home",
            icon: "i-heroicons-solid-home",
            to: "/",
            active: true
        },
        {
            name: "Trending",
            icon: "i-heroicons-solid-fire",
            to: "/trending",
            active: false
        },
        {
            name: "Subscriptions",
            icon: "i-heroicons-solid-chart-bar",
            to: "/subscriptions",
            active: false
        }
    ];

    const secondEntries = [
        {
            name: "Channels",
            icon: "i-heroicons-solid-folder",
            to: "/channels",
            active: false
        },
        {
            name: "Settings",
            icon: "i-heroicons-solid-cog",
            to: "/settings",
            active: false
        }
    ];
</script>
