// 秒级时间戳转文本
export function formatTimestamp(seconds: number, ignoreZeroMs=true): string {
  if (seconds < 1) {
    return ''
  }

  const date = new Date(seconds * 1000); // 自动处理小数部分（毫秒）

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const secondsStr = String(date.getSeconds()).padStart(2, "0");

  if (ignoreZeroMs){
    const ms = date.getMilliseconds();
    const msPart = ms > 0 ? `.${String(ms).padStart(3, '0')}` : '';

    return `${year}-${month}-${day} ${hours}:${minutes}:${secondsStr}${msPart}`;
  }

  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${secondsStr}.${milliseconds}`;
}

// Date转秒级时间戳
export function date2Timestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}
