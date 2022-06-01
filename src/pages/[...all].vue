<route>
{
    name: "404"
}
</route>

<template>
    <container>
        <p>404 page</p>
    </container>
</template>

<script lang="ts" setup>
    const route = useRoute();

    useHead({
        title: String(route.name),
        meta: [
            {
                name: "description",
                content: "Page not found"
            }
        ]
    });
</script>
