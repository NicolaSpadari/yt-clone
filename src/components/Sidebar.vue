<template>
    <aside scrollbar="~ thumb-color-zinc-400 rounded" max-h-custom-screen fixed top-80px bg-white z-20 divide-y divide-gray-200 :class="{ 'w-64': isOpen }">
        <div divide-y divide-gray-200>
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
            name: "Search",
            icon: "i-heroicons-solid-search",
            to: "/search",
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
