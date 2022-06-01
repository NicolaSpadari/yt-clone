<template>
    <aside shadow-lg scrollbar="~ rounded" h-screen overflow-auto fixed top-0 bg-white z-20 divide-y divide-gray-200 :class="{ 'w-64': isOpen }">
        <div divide-y divide-gray-200 pt-25>
            <Navigation :entries="firstEntries" />

            <Suspense>
                <UserSubscriptions v-if="signedIn" />
            </Suspense>

            <Navigation :entries="secondEntries" />
        </div>
    </aside>
</template>

<script lang="ts" setup>
    const { isOpen } = useSidebar();
    const { signedIn } = useUser();

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
