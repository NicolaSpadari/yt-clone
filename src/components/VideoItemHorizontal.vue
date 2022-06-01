<template>
    <div flex space-x-5 mb-7>
        <RouterLink :to="`/watch?v=${props.data.id.videoId}`" class="group">
            <img v-lazyload :data-src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" rounded-md w-full>
        </RouterLink>
        <div mt-3>
            <div text-sm space-y-2>
                <RouterLink :to="`/watch?v=${props.data.id}`" font-semibold text-gray-800>
                    {{ shorten(props.data.snippet.title, 60) }}
                </RouterLink>
                <RouterLink :to="`/channel/${props.data.snippet.channelId}`" flex mt-1>
                    <div relative>
                        <div flex h-full items-center space-x-1>
                            <i-heroicons-solid-desktop-computer w-5 h-5 text-red-500 />
                            <span>{{ props.data.snippet.channelTitle }}</span>
                        </div>
                    </div>
                </RouterLink>
                <div>Published {{ getReadableDate(props.data.snippet.publishedAt) }} ago</div>
            </div>

            <p text-sm text-dark-400 max-w-xl mt-5>
                {{ props.data.snippet.description }}
            </p>
        </div>
    </div>
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
