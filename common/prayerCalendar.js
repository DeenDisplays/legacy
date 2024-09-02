function fillCalendar() {
    var PT = new PrayTimes('ISNA');

    var row;
    var cell;
    var date = new Date();
    var times;

    var prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

    for (let i = 1; i <= 30; i++) {
        // Create a new table row
        row = document.createElement('tr');
        row.setAttribute("class", "date-" + i + " " + "day-" + date.getDay());
        times = PT.getTimes(date, [40.73, -74.18], -5, 'auto', '12h');

        addCell(row, i);

        addCell(row, date.toLocaleDateString('en-US', { weekday: 'short' }));

        addCell(row, date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            }));


        for (let k = 0; k < 5; k++) {
            addCell(row,times[prayers[k]]);
        }

        // Add the row to the table
        document.getElementById("calendar").appendChild(row);

        date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }
}

function addCell(row, text) {
    cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
}