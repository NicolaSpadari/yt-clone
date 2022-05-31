<template>
    <div space-y-5>
        <div rounded-lg overflow-hidden>
            <vue-plyr ref="plyr">
                <div class="plyr__video-embed">
                    <iframe
                        :src="`https://www.youtube.com/embed/${$route.query.v}?amp;iv_load_policy=3&amp;modestbranding=0&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    />
                </div>
            </vue-plyr>
        </div>

        <div>
            <container space-y-5>
                <p font-bold text-2xl>
                    {{ video.title }}
                </p>

                <p max-w-4xl>
                    {{ video.description }}
                </p>
            </container>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const video = ref();
    const plyr = ref<HTMLElement | null>(null);
    const player = ref();

    const { data } = await useFetchYT("videos?" + new URLSearchParams({
        part: "id,snippet",
        id: route.query.v,
        key: import.meta.env.VITE_YT_API_KEY
    })).get().json();

    video.value = data.value.items[0].snippet;

    useHead({
        title: video.value.title
    });

    onMounted(() => {
        player.value = plyr.value.player;

        setTimeout(() => {
            player.value.play();
        }, 1000);
    });
</script>
