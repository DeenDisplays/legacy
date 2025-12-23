function adjustIshaTime(times, ishaFixedHour, ishaFixedMinute) {
    if (ishaFixedHour === undefined || ishaFixedMinute === undefined) {
        return times;
    }

    const ishaHour = parseInt(times.isha.split(':')[0]);
    const ishaMinute = parseInt(times.isha.split(':')[1].substring(0, 2));
    if (ishaHour < ishaFixedHour || (ishaHour === ishaFixedHour && ishaMinute < ishaFixedMinute)) {
        times.isha = ishaFixedHour + ":" + (ishaFixedMinute < 10 ? '0' : '') + ishaFixedMinute + " PM";
    }
    return times;
}

function adjustAsrTime(iqaamahTimes, adhanTimes, asrFixedHour, asrFixedMinute) {
    if (asrFixedHour === undefined || asrFixedMinute === undefined) {
        return iqaamahTimes;
    }

    const adhanAsr = adhanTimes.asr;
    const adhanHour = parseInt(adhanAsr.split(':')[0]);
    const adhanMinute = parseInt(adhanAsr.split(':')[1].substring(0, 2));
    const adhanHour24 = adhanHour !== 12 ? adhanHour + 12 : 12;

    if (adhanHour24 < asrFixedHour || (adhanHour24 === asrFixedHour && adhanMinute < asrFixedMinute)) {
        const adhanDate = new Date();
        adhanDate.setHours(adhanHour24, adhanMinute, 0);
        adhanDate.setMinutes(adhanDate.getMinutes() + 5);

        const iqamahHour = adhanDate.getHours() % 12 || 12;
        const iqamahMinute = adhanDate.getMinutes();
        iqaamahTimes.asr = iqamahHour + ":" + (iqamahMinute < 10 ? '0' : '') + iqamahMinute + " pm";
    }
    return iqaamahTimes;
}

var PrayerUtils = {
    adjustIshaTime: adjustIshaTime,
    adjustAsrTime: adjustAsrTime
};