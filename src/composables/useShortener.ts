const useShortener = (text: string, len = 50) => {
    if (text.length >= len) {
        return text.slice(0, len) + "...";
    }

    return text;
};

export { useShortener };
export default useShortener;
