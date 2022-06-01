<template>
    <div mb-7>
        <RouterLink :to="`/watch?v=${props.data.id}`" class="group">
            <div relative>
                <img v-lazyload :data-src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" rounded-md w-full>
                <span bg-black rounded-md font-semibold m-1 text-white text-xs opacity-100 py-1 px-2 right-0 bottom-0 duration-500 absolute class="group-hover:opacity-0">
                    {{ getVideoDuration(props.data.contentDetails.duration) }}
                </span>
            </div>
        </RouterLink>
        <div flex mt-3 items-start>
            <img v-lazyload :data-src="props.channelThumbnail" rounded-full h-9 mr-3 w-9 :alt="props.data.snippet.title">
            <div text-sm>
                <RouterLink :to="`/watch?v=${props.data.id}`" font-semibold text-gray-800>
                    {{ shorten(props.data.snippet.title, 60) }}
                </RouterLink>
                <RouterLink :to="`/channel/${props.data.snippet.channelId}`" flex mt-1>
                    <div relative>
                        <div flex h-full items-center>
                            <span>{{ props.data.snippet.channelTitle }}</span>
                        </div>
                    </div>
                </RouterLink>
                <div>{{ formatNumber(props.data.statistics.viewCount) }} views · {{ getReadableDate(props.data.snippet.publishedAt) }} ago</div>
            </div>
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
