<template>
    <section rounded-lg bg-gray-100 p-8>
        <div grid gap-12 grid-cols-1 sm="grid-cols-3 items-center">
            <div relative>
                <RouterLink :to="`/watch?v=${props.data.id.videoId}`" aspect-video>
                    <img
                        v-lazyload
                        :data-src="props.data.snippet.thumbnails.medium.url"
                        :alt="props.data.snippet.title"
                        :title="props.data.snippet.title"
                        rounded-lg object-cover
                    >
                </RouterLink>

                <div bg-white rounded-lg shadow-xl py-2 px-4 right--4 bottom--4 absolute inline-flex>
                    <i-heroicons-solid-play w-5 h-5 text-red-500 />
                </div>
            </div>

            <blockquote space-y-8 sm="col-span-2">
                <cite items-center not-italic>
                    <p text-sm text-gray-500>
                        <RouterLink :to="`/watch?v=${props.data.id.videoId}`" font-bold>
                            {{ shorten(props.data.snippet.title, 60) }}
                        </RouterLink>
                        &middot;
                        <RouterLink :to="`/channel/${props.data.snippet.channelId}`" hover="underline">
                            {{ props.data.snippet.channelTitle }}
                        </RouterLink>
                    </p>
                    <p text-sm text-gray-500>
                        Published {{ getReadableDate(props.data.snippet.publishedAt) }} ago
                    </p>
                </cite>
                <p text-sm text-gray-600>
                    {{ props.data.snippet.description }}
                </p>
            </blockquote>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const props = defineProps({
        data: Object,
        channelThumbnail: String
    });

    const { formatNumber, shorten, getReadableDate } = useUtils();

    const getVideoDuration = (durationISO: string) => {
        let match = durationISO.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        match = match?.slice(1).map((x) => {
            if (x != null) {
                return x.replace(/\D/, "");
            }
            return null;
        }) as RegExpMatchArray;

        const hours = (parseInt(match[0]) || 0);
        const minutes = (parseInt(match[1]) || 0);
        const seconds = (parseInt(match[2]) || 0);

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const durationObj = intervalToDuration({ start: 0, end: totalSeconds * 1000 });

        if (durationObj.hours && durationObj.hours > 0) {
            return `${durationObj.hours}:${durationObj.minutes}:${durationObj.seconds}`;
        }
        if (durationObj.minutes && durationObj.minutes > 0) {
            return `${durationObj.minutes}:${durationObj.seconds}`;
        }

        return `0:${durationObj.seconds}`;
    };
</script>
