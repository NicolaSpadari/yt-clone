const state = reactive({
    isOpen: false
});

const useSidebar = () => {
    const toggleSidebar = () => {
        state.isOpen = !state.isOpen;
    };

    return {
        ...toRefs(state),
        toggleSidebar
    };
};

export { useSidebar };
export default useSidebar;
