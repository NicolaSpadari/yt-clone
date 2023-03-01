<template>
    <div fixed w-full z-30 transition-shadow duration-300 shadow>
        <div flex justify-between w-full bg-white bg-opacity-60 backdrop-filter backdrop-blur :class="signedIn ? 'py-3' : ''">
            <div flex space-x-6 lg="w-1/4">
                <div flex items-center pl-4 space-x-3 xl="w-64">
                    <button id="sidebar-toggle" :class="isOpen ? 'i-heroicons-outline-x' : 'i-heroicons-outline-menu'" w-6 h-6 @click="toggleSidebar()" />
                    <RouterLink to="/" flex items-center space-x-2>
                        <LogoV2 w-8 h-8 text-red-500 />
                        <span text-dark-800 font-bold text-sm>YouPlayer</span>
                    </RouterLink>
                </div>
            </div>
            <div hidden sm="flex" items-center justify-end p-2.5 pl-8 md="pl-12 px-8" flex-1 lg="w-1/2 px-0" max-w-screen-md>
                <div relative flex-1>
                    <label sr-only for="search"> Search </label>

                    <input
                        id="search"
                        v-model="searchTerm"
                        w-full py-2 pl-3 pr-16 text-sm border-1 border-gray-200
                        rounded-lg
                        type="text"
                        placeholder="Search"
                        spellcheck="false"
                        @keyup.enter="search()"
                    >

                    <button i-heroicons-outline-search absolute p-2 text-white translate-y="-1/2" bg-blue-600 rounded-full top="1/2" right-4 type="button" />
                </div>
            </div>
            <div flex p-2 items-center justify-end sm="space-x-3 px-4" lg="w-1/4">
                <button v-if="!signedIn" inline-flex items-center px-5 py-3 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white active:bg-blue-500 focus:outline-none focus:ring space-x-2 @click="login()">
                    <span text-sm uppercase>
                        Sign in
                    </span>

                    <i-heroicons-solid-user-circle w-5 h-5 />
                </button>

                <div v-else>
                    <button ref="dropdownToggle" @click="dropdownOpen = !dropdownOpen">
                        <img v-lazyload :data-src="user.user.photoURL" rounded-full h-9 w-9 :alt="user.user.displayName" referrerpolicy="no-referrer">
                    </button>
                    <Dropdown :open="dropdownOpen">
                        <DropdownEntry>
                            <RouterLink :key="String(signedIn)" :to="String(`/channel/${userChannel.id}`)">
                                {{ user.user.displayName }}
                            </RouterLink>
                        </DropdownEntry>
                        <DropdownEntry>
                            <button @click="logout()">
                                Logout
                            </button>
                        </DropdownEntry>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { toggleSidebar, isOpen } = useSidebar();
    const { user, login, logout, signedIn } = useUser();
    const { userChannel } = useYoutube();
    const router = useRouter();
    const searchTerm = ref("");
    const dropdownOpen = ref(false);
    const dropdownToggle = ref<HTMLElement | null>(null);

    onClickOutside(dropdownToggle, () => {
        dropdownOpen.value = false;
    });

    const search = () => {
        router.push({
            path: "/search",
            query: {
                search_query: searchTerm.value
            }
        });
    };
</script>
