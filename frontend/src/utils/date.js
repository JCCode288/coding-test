import moment from "moment";

export function formatDate(date) {
   return moment(date).format("dddd, DD MMMM YYYY");
}
