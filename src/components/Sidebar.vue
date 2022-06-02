<template>
    <div z-10 relative role="dialog">
        <Transition name="fade">
            <div v-show="isOpen" bg-gray-500 bg-opacity-75 inset-0 transition-opacity fixed />
        </Transition>

        <div inset-0 fixed overflow-hidden :class="isOpen ? '' : 'pointer-events-none'">
            <div inset-0 absolute overflow-hidden>
                <div flex max-w-full inset-y-0 left-0 pointer-events-none fixed>
                    <Transition name="slide">
                        <div v-show="isOpen" max-w-sm w-screen transform pointer-events-auto>
                            <aside bg-white flex flex-col h-full shadow-xl>
                                <div max-h-custom-screen pt-100px scrollbar="~ thumb-color-zinc-400 rounded">
                                    <div flex-1>
                                        <Navigation :entries="firstEntries" />

                                        <Suspense>
                                            <UserSubscriptions v-if="signedIn" />
                                        </Suspense>

                                        <Navigation :entries="secondEntries" />
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
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
