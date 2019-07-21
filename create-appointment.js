var Acuity = require("acuityscheduling");
var Moment = require("moment");
const express = require('express')

const app = express()
const port = 3000

var acuity = Acuity.basic({
    userId: 17838093,
    apiKey: "d9e04642e0767bbeecdc4daa59297630"
});

const getAvailabletimesHandler = date => {
    console.log(date);
    return new Promise(resolve => {
        acuity.request(
            "availability/times?appointmentTypeID=10397443&date=" + date,
            (err, res, times) => {
                resolve(
                    times.map(({ time }) => ({
                        time: Moment(time).format("LLL")
                    }))
                );
            }
        );
    });
};

function addWeekdays(date, days) {
    date = Moment(date); // use a clone
    while (days > 0) {
        date = date.add(1, "days");
        // decrease "days" only if it's a weekday.
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            days -= 1;
        }
    }
    return date;
}

const getAvailableTimes = async() => {
    const availableTimes = [];

    for (var i = 0; i < 3; i++) {
        const times = await getAvailabletimesHandler(
            addWeekdays(Moment(), i + 1).format("YYYY-MM-DD")
        );
        availableTimes.push(...times);
    }
    return availableTimes;
};

app.get('/availability', async(req, res) => {
    const availability = await getAvailableTimes();
    res.json(availability)
})

app.listen(port, () => console.log(`Create-Appointment started on port: ${port}!`))