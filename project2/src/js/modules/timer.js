const timer = (id, deadline) => {
    const getTimeRemaining = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / 1000 / 60 / 60) % 24),
            days = Math.floor((time / 1000 / 60 / 60 / 24));


        return {
            'total': time,
            'days': days,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        };
    };


    const setClock = (selector, deadline) => {
        const timerApp = document.querySelector(selector),
            days = timerApp.querySelector('#days'),
            hours = timerApp.querySelector('#hours'),
            minutes = timerApp.querySelector('#minutes'),
            seconds = timerApp.querySelector('#seconds'),
            timerInterval = setInterval(updateClock, 1000);
        
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(deadline);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }

        function getZero(num) {
            if (num < 10) {
                return `0${num}`;
            }else{
                return num;
            }
        }
    };

    setClock(id, deadline);
};

export default timer;