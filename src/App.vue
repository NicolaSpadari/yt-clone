<template>
    <Header />
    <Sidebar />

    <main px-5 pb-5 pt-27 :class="open ? 'ml-64' : 'ml-14'">
        <router-view v-slot="{ Component }">
            <Suspense>
                <component :is="Component" />
            </Suspense>
        </router-view>
    </main>
</template>

<script lang="ts" setup>
    const { open } = useSidebar();
</script>

<style lang="scss">
    :root{
        --plyr-color-main: #ef4444;
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
    container {
        @apply mx-auto;
    }
</style>
