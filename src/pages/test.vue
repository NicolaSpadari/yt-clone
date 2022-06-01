<template>
    <div ref="el" text-center max-h-custom-screen scrollbar="~ thumb-color-zinc-400 rounded">
        <div v-for="item in data" :key="item" py-50>
            {{ item }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    const el = ref();
    const data = ref([1, 2, 3, 4, 5, 6]);

    useInfiniteScroll(el, (state) => {
        console.log(state);
        const length = data.value.length + 1;
        data.value.push(...Array.from({ length: 5 }, (_, i) => length + i));
    });
</script>
