import dayjs from 'dayjs';

export function formatToTimeAgo(data: string): string {
  let createDay = dayjs(data);
  let now = dayjs(Date.now());
  let diffSec = now.diff(createDay, 's');
  let diffMin = now.diff(createDay, 'm');
  let diffHour = now.diff(createDay, 'h');
  let fullDate = createDay.format('YYYY.MM.DD');
  if (diffSec < 60) {
    return `${diffSec}초 전`;
  }
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }
  return fullDate;
}
