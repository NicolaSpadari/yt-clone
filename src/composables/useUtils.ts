const useUtils = () => {
    const getReadableDate = (dateISO: string) => {
        return formatDistanceToNow(parseISO(dateISO)).replace("about ", "");
    };

    const formatNumber = (num: number) => {
        const formatter = Intl.NumberFormat("en", { notation: "compact" });
        return formatter.format(num);
    };

    const shorten = (text: string, len = 50) => {
        if (text.length >= len) {
            return text.slice(0, len) + "...";
        }

        return text;
    };

    const escape = (html: string) => {
        const div = document.createElement("div");
        div.innerText = html;
        return div.innerHTML;
    };

    return {
        getReadableDate,
        formatNumber,
        shorten,
        escape
    };
};

export { useUtils };
export default useUtils;
