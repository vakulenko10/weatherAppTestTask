export const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatTooltipTitle = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });