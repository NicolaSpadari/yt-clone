const state = reactive({
    open: false
});

const useSidebar = () => {
    const toggleSidebar = () => {
        state.open = !state.open;
    };

    return {
        ...toRefs(state),
        toggleSidebar
    };
};

export { useSidebar };
export default useSidebar;
