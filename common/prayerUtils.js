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