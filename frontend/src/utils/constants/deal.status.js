export const DealStatus = Object.freeze({
   WON: "Closed Won",
   LOSE: "Closed Lost",
   PROGRESS: "In Progress",
});

export const StatusColor = Object.freeze({
   [DealStatus.WON]: "border-green-600 bg-green-600 text-green-950",
   [DealStatus.LOSE]: "border-red-600 bg-red-600 text-red-950",
   [DealStatus.PROGRESS]: "border-blue-600 bg-blue-600 text-blue-950",
});
