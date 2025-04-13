const formatter = new Intl.NumberFormat("us-US");

export function formatCurrency(val) {
   return formatter.format(val);
}
