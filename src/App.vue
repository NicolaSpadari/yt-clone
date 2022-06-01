<template>
    <Header />
    <Sidebar />

    <main :class="isOpen ? 'ml-64' : 'ml-14'">
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </router-view>
    </main>

    <Alert />
</template>

<script lang="ts" setup>
    const { isOpen } = useSidebar();
</script>

<style lang="scss">
    :root{
        --plyr-color-main: theme("colors.red.500");
    }
    html {
        -webkit-tap-highlight-color: transparent;
        scroll-behavior: smooth;
    }
    body {
        @apply overflow-x-hidden;
    }
    img {
        -webkit-user-drag: none;
        @apply select-none;
    }
    [container] {
        @apply mx-auto;
    }

    .fade-enter-active,
    .fade-leave-active {
        @apply transition-opacity ease duration-500;
    }

    .fade-enter-from,
    .fade-leave-to {
        @apply opacity-0;
    }
</style>
