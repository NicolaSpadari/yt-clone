const useShortener = () => {
    const shorten = (text: string, len = 50) => {
        if (text.length >= len) {
            return text.slice(0, len) + "...";
        }

        return text;
    };
    return {
        shorten
    };
};

export { useShortener };
export default useShortener;
