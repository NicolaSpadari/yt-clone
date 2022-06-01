const state = reactive({
    visible: false,
    message: ""
});

const useAlert = () => {
    const showAlert = (msg: string) => {
        state.visible = true;
        state.message = msg;
    };

    const closeAlert = () => {
        state.visible = false;
    };

    return {
        ...toRefs(state),
        showAlert,
        closeAlert
    };
};

export { useAlert };
export default useAlert;
