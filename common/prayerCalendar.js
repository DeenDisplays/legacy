function fillCalendar(date, hijriMonth) {

    if (date == undefined)
        date = new Date();

    setMonths(date, hijriMonth);

    var timeNames = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
    var offsets = {"fajr":25, "dhuhr":20, "asr":20, "maghrib":10, "isha":10};

    var PT = new PrayTimes('ISNA');
    var iqaamahPT = new PrayTimes('ISNA');
    iqaamahPT.tune(offsets);

    var row;
    var cell;
    var times;

    for (let i = 1; i <= 30; i++) {
        // Create a new table row
        row = document.createElement('tr');
        row.setAttribute("class", "date-" + i + " " + "day-" + date.getDay());
        times = PT.getTimes(date, [40.73, -74.18], -5, 'auto', '12h');
        iqaamahTimes = iqaamahPT.getTimes(date, [40.73, -74.18], -5, 'auto', '12h');
        if (date.getDay() == 5)
            iqaamahTimes.dhuhr = '1:00 pm';

        addCell(row, i);

        addCell(row, date.toLocaleDateString('en-US', { weekday: 'short' }));

        addCell(row, date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            }));

        for (let k = 0; k < timeNames.length; k++) {
            var timeName = timeNames[k];

            addCell(row,times[timeName]);

            if (timeName != "sunrise") {
                addCell(row,iqaamahTimes[timeName], 'iqaamah');
            }
        }

        // Add the row to the table
        document.getElementById("calendar").appendChild(row);

        date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }
}

function setMonths(date, hijriMonth) {
    document.getElementById("hijriMonth").textContent = hijriMonth;

    var thisMonthString = date.toLocaleDateString('en-US', {
        month: 'long',
        year : 'numeric'
        });

    var nextMonth = new Date(date.getTime() + 29 * 24 * 60 * 60 * 1000);

    var nextMonthString = nextMonth.toLocaleDateString('en-US', {
        month: 'long',
        year : 'numeric'
        });
    
    var gregorianMonths = thisMonthString == nextMonthString ? thisMonthString : thisMonthString + " | " + nextMonthString;
    document.getElementById("gregorianMonths").innerHTML = gregorianMonths;
}

function addCell(row, text, styleClass) {
    cell = document.createElement('td');
    cell.textContent = text;
    if (styleClass != undefined) {
        cell.setAttribute("class", styleClass);
    }
    row.appendChild(cell);
}