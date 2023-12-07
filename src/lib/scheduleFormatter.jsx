// scheduleFormatter.js

function formatDay(day) {
    const days = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
    return days[day - 1];
  }
  
  function formatTime(time) {
    return `${time.substring(0, 2)}:${time.substring(2)}`;
  }
  
  export function formatWeekdays(schedule) {
    return schedule.filter(entry => entry.close.day <= 4).map((entry, index) => {
      const day = formatDay(entry.close.day);
      const openTime = formatTime(entry.open.time);
      const closeTime = formatTime(entry.close.time);
      return <li key={index}>{`${day}: ${openTime} - ${closeTime}`}</li>;
    });
  }
  export function formatWeekend(schedule) {
    return schedule.filter(entry => entry.close.day >= 5).map((entry, index) => {
      const day = formatDay(entry.close.day);
      const openTime = formatTime(entry.open.time);
      const closeTime = formatTime(entry.close.time);
      return <li key={index}>{`${day}: ${openTime} - ${closeTime}`}</li>;
    });
  }