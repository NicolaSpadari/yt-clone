<template>
    <div rounded py-3 px-5 relative inline-block class="group">
        <div font-medium text-sm transition-opacity class="group-hover:opacity-0">
            <slot name="front" />
        </div>

        <div flex opacity-0 inset-0 transition-opacity absolute items-center justify-center class="group-hover:opacity-100">
            <slot name="back" />
        </div>
    </div>
</template>
