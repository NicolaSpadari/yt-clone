<template>
    <RouterLink :to="`/watch?v=${props.data.id}`" class="mb-7 group">
        <div class="relative">
            <img :src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" rounded-md w-full>
            <span class="bg-black rounded-sm bg-opacity-60 m-1 text-white opacity-0 p-1 top-0 right-0 absolute group-hover:opacity-100">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-testid="base-icon">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="bg-black rounded-l-sm font-semibold bg-opacity-60 right-full text-xs transition-width top-0 w-0 delay-100 absolute whitespace-nowrap overflow-hidden uppercase">
                    <span class="my-1.5 mx-3 inline-block">Watch later</span>
                </span>
            </span>
            <span class="bg-black rounded-sm bg-opacity-60 m-1 text-white opacity-0 p-1 top-8 right-0 absolute group-hover:opacity-100">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-testid="base-icon">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="bg-black rounded-l-sm font-semibold bg-opacity-60 right-full text-xs transition-width top-0 w-0 delay-100 absolute whitespace-nowrap overflow-hidden uppercase">
                    <span class="my-1.5 mx-3 inline-block">Add to queue</span>
                </span>
            </span>
            <span class="bg-black rounded-md font-semibold m-1 text-white text-xs opacity-100 py-1 px-2 right-0 bottom-0 duration-500 absolute group-hover:opacity-0"> 6:35 </span>
        </div>
        <div class="flex mt-3 items-start">
            <img src="https://picsum.photos/seed/avatar1/68" class="rounded-full h-9 mr-3 w-9" alt="">
            <div class="text-sm">
                <span class="font-semibold text-gray-800">{{ useShortener(props.data.snippet.title, 60) }}</span>
                <div class="flex mt-1">
                    <div class="relative">
                        <div class="flex h-full items-center">
                            <span>Channel name 1</span>
                        </div>
                        <div class="rounded-sm bg-gray-600 bg-opacity-80 text-white text-xs p-2 transform bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap absolute" style="display: none;">
                            Channel name 1
                        </div>
                    </div>
                    <div class="relative">
                        <div class="flex h-full items-center">
                            <svg class="h-3.5 ml-1 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-testid="base-icon">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="rounded-sm bg-gray-600 bg-opacity-80 text-white text-xs p-2 transform bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap absolute" style="display: none;">
                            Verified
                        </div>
                    </div>
                </div>
                <div>1K views · 1 day ago</div>
            </div>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
    import { useShortener } from "@/composables/useShortener";

    const props = defineProps({
        data: Object
    });
</script>
