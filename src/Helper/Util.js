export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (!date) return "";

  const months = [
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

  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + " " + month;
};

export const colorsList = [
  "#a8193d",
  "#4fcc25",
  "#9975bd",
  "yellow",
  "red",
  "#cf61a1",
  "#240959",
  "blue",
  "black"
];
