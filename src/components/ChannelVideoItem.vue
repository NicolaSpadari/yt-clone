<template>
    <RouterLink :to="`/watch?v=${props.data.id.videoId}`" class="group" mb-7>
        <div relative>
            <img v-lazyload :data-src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" rounded-md w-full>
            <span bg-black rounded-md font-semibold m-1 text-white text-xs opacity-100 py-1 px-2 right-0 bottom-0 duration-500 absolute class="group-hover:opacity-0">
                0:00
            </span>
        </div>
        <div flex mt-3 items-start>
            <div text-sm space-y-1>
                <p font-semibold text-gray-800>
                    {{ escape(shorten(props.data.snippet.title, 60)) }}
                </p>
                <div>{{ getReadableDate(props.data.snippet.publishedAt) }} ago</div>
            </div>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
    const props = defineProps({
        data: Object
    });

    const { formatNumber, shorten, escape } = useUtils();

    const getReadableDate = (dateISO: string) => {
        return formatDistanceToNow(parseISO(dateISO)).replace("about ", "");
    };

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
