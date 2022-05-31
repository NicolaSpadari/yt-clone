import { useIntersectionObserver } from "@vueuse/core";

const mounted = (el: HTMLImageElement) => {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            el.src = el.dataset.src!;
            stop();
        }
    });
};

export const LazyLoad = {
    mounted
};

export default LazyLoad;
