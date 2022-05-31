import { createFetch } from "@vueuse/core";

const useFetchYT = createFetch({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/",
    fetchOptions: {
        mode: "cors"
    }
});

export { useFetchYT };
export default useFetchYT;
