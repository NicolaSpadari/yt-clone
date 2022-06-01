<template>
    <div
        v-if="visible"
        class="border rounded flex min-w-sm bg-sky-100 border-sky-900/10 p-4 right-16 bottom-16 text-sky-700 fixed items-center justify-between"
        role="alert"
    >
        <p class="font-bold text-sm">
            {{ message }}
        </p>

        <button class="opacity-90" type="button" @click="closeAlert()">
            <span class="sr-only"> Close </span>
            <div class="h-4 w-4 i-heroicons-outline-x" />
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { visible, message, closeAlert } = useAlert();
</script>
