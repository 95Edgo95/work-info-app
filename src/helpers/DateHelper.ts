export function formatDate(date: Date): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  let month: string = `${date.getMonth() + 1}`;
  const year: number = date.getFullYear();
  let day: string = `${date.getDate()}`;

  if (month.length === 1) {
    month = `0${month}`;
  }

  if (day.length === 1) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} 00:00:00`;
}

export function addDays(days: number, date?: Date): Date {
  const result: Date = date ? new Date(date) : new Date();
  result.setDate(result.getDate() + days);

  return result;
}
