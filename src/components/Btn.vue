<template>
    <button inline-flex items-center px-5 py-3 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white active:bg-blue-500 focus:outline-none focus:ring space-x-2>
        <span text-sm uppercase>
            <slot />
        </span>

        <i-heroicons-solid-user-circle w-5 h-5 />
    </button>
</template>
