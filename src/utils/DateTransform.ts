export default function (data: string) {
     return new Date(data).toLocaleString()
}

export function formatHours(hoursDecimal: number): string {
     const hours = Math.floor(hoursDecimal);
     const minutes = Math.round((hoursDecimal - hours) * 60);
     return `${hours}h ${minutes}m`;
   }
   