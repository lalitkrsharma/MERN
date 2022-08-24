const getDateAsString = (type, date) => {
  let dateString = "";
  switch (type) {
    case "yyyy-mm-dd":
      dateString = `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
      return dateString;
    case "day, mon dd":
      let newDate = new Date(date);
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      dateString = `${weekday[newDate.getUTCDay()]}, ${
        month[newDate.getMonth()]
      } ${newDate.getDate()}`;
      return dateString;
    default:
      return null;
  }
};

export default getDateAsString;
