<template>
    <div class="rich-text">
        <p max-w-4xl text-sm text-dark-600 :class="descriptionExpanded ? '' : 'max-h-xs overflow-y-hidden'" v-html="enrichText(props.text)" />
        <button rounded-lg inline-flex py-2 items-center space-x-2 text-gray-800 bg-gray-100 px-3 mt-5 @click="descriptionExpanded = !descriptionExpanded">
            <span>{{ descriptionExpanded ? "Show less" : "Show more" }}</span>

            <span :class="descriptionExpanded ? 'i-heroicons-solid-chevron-up' : 'i-heroicons-solid-chevron-down'" w-5 h-5 />
        </button>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        text: {
            type: String,
            default: ""
        }
    });

    const { enrichText } = useUtils();
    const descriptionExpanded = ref(false);
</script>
