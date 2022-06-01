const useUtils = () => {
    const getReadableDate = (dateISO: string) => {
        return formatDistanceToNow(parseISO(dateISO)).replace("about ", "");
    };

    const formatNumber = (num: number) => {
        const formatter = Intl.NumberFormat("en", { notation: "compact" });
        return formatter.format(num);
    };

    const dotNumber = (number: string | number) => {
        return Number(number).toLocaleString();
    }

    const shorten = (text: string, len = 50) => {
        if (text.length >= len) {
            return text.slice(0, len) + "...";
        }

        return text;
    };

    const escape = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const enrichText = (text: string) => {
        const URLMatcher = /(?:(?:https):\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm;
        return text.replace(/\n/g, "<br>").replace(URLMatcher, (match: any) => `<a href="${match}" target="_blank">${match}</a>`);
    };

    return {
        getReadableDate,
        formatNumber,
        dotNumber,
        shorten,
        escape,
        enrichText
    };
};

export { useUtils };
export default useUtils;
