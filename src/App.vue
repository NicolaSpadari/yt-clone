<template>
    <Header />
    <Sidebar />

    <main>
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </router-view>
    </main>

    <Alert />
</template>

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

    // Transitions
    .fade-enter-active,
    .fade-leave-active {
        @apply transition-opacity ease-in-out duration-500;
    }
    .fade-enter-from,
    .fade-leave-to {
        @apply opacity-0;
    }

    .slide-enter-active,
    .slide-leave-active{
        @apply transition-transform ease-in-out duration-500;
    }
    .slide-enter-from,
    .slide-leave-to{
        @apply -translate-x-full;
    }
</style>
