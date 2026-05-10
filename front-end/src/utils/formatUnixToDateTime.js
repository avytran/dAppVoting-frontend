export const formatUnixToDatetime = (unixTimestamp) => {
    const date = new Date(Number(unixTimestamp) * 1000);
    const tzoffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - tzoffset).toISOString().slice(0, 16);
    return localISOTime;
};