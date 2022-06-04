<template>
    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <div v-show="props.open" origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus="outline-none" role="menu" tabindex="-1">
            <div py-1 role="none">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    const props = defineProps({
        open: {
            type: Boolean,
            default: false
        }
    });
</script>
