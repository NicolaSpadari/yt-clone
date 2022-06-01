<template>
    <div space-y-10>
        <p text-dark-800 font-semibold text-2xl>
            Comments <span text-base text-gray-600>({{ dotNumber(props.count) }})</span>
        </p>

        <div ref="container" max-h-screen scrollbar="~ w-0" space-y-7 pb-10>
            <div v-for="comment in comments" :key="comment.id">
                <div flex items-start space-x-3>
                    <RouterLink :to="`/channel/${comment.snippet.topLevelComment.snippet.authorChannelId.value}`">
                        <img v-lazyload :data-src="comment.snippet.topLevelComment.snippet.authorProfileImageUrl" rounded-full h-9 w-9 :alt="comment.snippet.topLevelComment.snippet.authorDisplayName" referrerpolicy="no-referrer">
                    </RouterLink>
                    <div text-sm max-w-4xl>
                        <p font-medium text-gray-800>
                            {{ comment.snippet.topLevelComment.snippet.authorDisplayName }}
                        </p>
                        <p text-dark-800 text-sm text-gray-600>
                            {{ comment.snippet.topLevelComment.snippet.textDisplay }}
                        </p>
                        <div flex items-center space-x-2 mt-1>
                            <i-heroicons-solid-thumb-up w-5 h-5 text-gray-400 />
                            <p text-dark text-xs text-gray-600>
                                {{ formatNumber(comment.snippet.topLevelComment.snippet.likeCount) }}
                            </p>
                        </div>
                    </div>
                </div>

                <details v-if="comment.replies" class="group" space-y-5 ml-10 mt-3>
                    <summary cursor-pointer rounded-lg inline-flex py-2 items-center space-x-5 text-gray-800 hover:bg-gray-100 px-3>
                        <span font-medium text-sm text-gray-600>
                            Show replies
                        </span>

                        <i-heroicons-solid-chevron-right w-5 h-5 transition-transform duration-250 class="group-open:rotate-90" />
                    </summary>
                    <div v-for="reply in comment.replies.comments" :key="reply.id" flex items-start space-x-3>
                        <RouterLink :to="`/channel/${reply.snippet.authorChannelId.value}`">
                            <img v-lazyload :data-src="reply.snippet.authorProfileImageUrl" rounded-full h-9 w-9 :alt="reply.snippet.authorDisplayName" referrerpolicy="no-referrer">
                        </RouterLink>
                        <div text-sm max-w-4xl>
                            <p font-medium text-gray-800>
                                {{ reply.snippet.authorDisplayName }}
                            </p>
                            <p text-dark-800 text-sm text-gray-600>
                                {{ reply.snippet.textDisplay }}
                            </p>
                            <div flex items-center space-x-2 mt-1>
                                <i-heroicons-solid-thumb-up w-5 h-5 text-gray-400 />
                                <p text-dark text-xs text-gray-600>
                                    {{ formatNumber(reply.snippet.likeCount) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        videoId: String,
        count: String
    });

    const { formatNumber, dotNumber } = useUtils();
    const container = ref<HTMLElement | null>(null);
    const comments = ref<any[]>([]);
    const pageToken = ref("");
    const loaded = ref(false);

    const loadComments = async () => {
        const { data } = await useFetchYT("commentThreads?" + new URLSearchParams({
            part: "id,snippet,replies",
            videoId: String(props.videoId),
            maxResults: "20",
            order: "relevance",
            textFormat: "plainText",
            pageToken: pageToken.value,
            key: import.meta.env.VITE_YT_API_KEY
        })).get().json();

        pageToken.value = data.value.nextPageToken;
        comments.value.push(...data.value.items);
    };

    const { stop } = useIntersectionObserver(container, async ([{ isIntersecting }]) => {
        if (isIntersecting) {
            console.log("intersecting");

            await loadComments();
            stop();
            loaded.value = true;
        }
    });

    useInfiniteScroll(container, async () => {
        await loadComments();
    });
</script>
