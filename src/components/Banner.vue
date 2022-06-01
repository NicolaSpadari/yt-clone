<template>
    <section class="rounded-lg overflow-hidden">
        <img :src="props.image" alt="banner" aspect-4 w-full h-full object-cover>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps({
        image: String
    });
</script>
