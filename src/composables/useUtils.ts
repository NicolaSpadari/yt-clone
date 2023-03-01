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
    };

    const getPublishDate = (date: string) => {
        return format(parseISO(date), "dd MMMM yyyy");
    };

    const getVideoDuration = (durationISO: string) => {
        let match = durationISO.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        match = match?.slice(1).map((x) => {
            if (x != null) {
                return x.replace(/\D/, "");
            }
            return null;
        }) as RegExpMatchArray;

        const hours = (parseInt(match[0]) || 0);
        const minutes = (parseInt(match[1]) || 0);
        const seconds = (parseInt(match[2]) || 0);

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const durationObj = intervalToDuration({ start: 0, end: totalSeconds * 1000 });

        if (durationObj.hours && durationObj.hours < 10) {
            durationObj.hours = `0${durationObj.hours}`;
        }
        if (durationObj.minutes && durationObj.minutes < 10) {
            durationObj.minutes = `0${durationObj.minutes}`;
        }
        if (durationObj.seconds && durationObj.seconds < 10) {
            durationObj.seconds = `0${durationObj.seconds}`;
        }

        if (durationObj.hours && durationObj.hours > 0) {
            return `${durationObj.hours}:${durationObj.minutes}:${durationObj.seconds}`;
        }
        if (durationObj.minutes && durationObj.minutes > 0) {
            return `${durationObj.minutes}:${durationObj.seconds}`;
        }

        return durationObj.seconds;
    };

    const shorten = (text: string, len = 50) => {
        if (text.length >= len) {
            return `${text.slice(0, len)}...`;
        }

        return text;
    };

    const escape = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const enrichText = (text: string) => {
        const URLMatcher = /(?:(?:https|http):\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm;
        return text.replace(/\n/g, "<br>").replace(URLMatcher, (match: any) => `<a href="${match}" target="_blank">${match}</a>`);
    };

    const shareVideo = (videoId: string) => {
        navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoId}`);
    };

    return {
        getReadableDate,
        getVideoDuration,
        formatNumber,
        dotNumber,
        shorten,
        escape,
        enrichText,
        shareVideo,
        getPublishDate
    };
};

export { useUtils };
export default useUtils;
