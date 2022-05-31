<template>
    <RouterLink :to="`/watch?v=${props.data.id}`" class="mb-7 group">
        <div class="relative">
            <img v-lazyload :data-src="props.data.snippet.thumbnails.medium.url" :title="props.data.snippet.title" rounded-md w-full>
            <span class="bg-black rounded-sm bg-opacity-60 m-1 text-white opacity-0 p-1 top-0 right-0 absolute group-hover:opacity-100">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-testid="base-icon">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span class="bg-black rounded-l-sm font-semibold bg-opacity-60 right-full text-xs transition-width top-0 w-0 delay-100 absolute whitespace-nowrap overflow-hidden uppercase">
                    <span class="my-1.5 mx-3 inline-block">Watch later</span>
                </span>
            </span>
            <span class="bg-black rounded-sm bg-opacity-60 m-1 text-white opacity-0 p-1 top-8 right-0 absolute group-hover:opacity-100">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-testid="base-icon">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="bg-black rounded-l-sm font-semibold bg-opacity-60 right-full text-xs transition-width top-0 w-0 delay-100 absolute whitespace-nowrap overflow-hidden uppercase">
                    <span class="my-1.5 mx-3 inline-block">Add to queue</span>
                </span>
            </span>
            <span class="bg-black rounded-md font-semibold m-1 text-white text-xs opacity-100 py-1 px-2 right-0 bottom-0 duration-500 absolute group-hover:opacity-0">
                {{ getVideoDuration(props.data.contentDetails.duration) }}
            </span>
        </div>
        <div class="flex mt-3 items-start">
            <img v-lazyload :data-src="props.channelThumbnail" class="rounded-full h-9 mr-3 w-9" alt="">
            <div class="text-sm">
                <span class="font-semibold text-gray-800">{{ shorten(props.data.snippet.title, 60) }}</span>
                <div class="flex mt-1">
                    <div class="relative">
                        <div class="flex h-full items-center">
                            <span>{{ props.data.snippet.channelTitle }}</span>
                        </div>
                        <div class="rounded-sm bg-gray-600 bg-opacity-80 text-white text-xs p-2 transform bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap absolute" style="display: none;">
                            {{ props.data.snippet.channelTitle }}
                        </div>
                    </div>
                </div>
                <div>{{ getViews(props.data.statistics.viewCount) }} views · {{ getReadableDate(props.data.snippet.publishedAt) }} ago</div>
            </div>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
    const props = defineProps({
        data: Object,
        channelThumbnail: String
    });

    const { shorten } = useShortener();

    const getReadableDate = (dateISO: string) => {
        return formatDistanceToNow(parseISO(dateISO)).replace("about ", "");
    };

    const getViews = (views: number) => {
        const formatter = Intl.NumberFormat("en", { notation: "compact" });
        return formatter.format(views);
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
