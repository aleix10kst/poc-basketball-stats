const formatMinutes = (minutes: number) => {
  let formattedMinutes = '';
  const length = String(minutes).length;
  if (minutes === 0) {
    formattedMinutes = `00`;
    return formattedMinutes;
  }
  formattedMinutes = length > 1 ? minutes.toFixed() : `0${minutes}`;
  return formattedMinutes;
};

const formatSeconds = (seconds: number) => {
  let formattedSeconds = '';
  const length = String(seconds).length;
  if (seconds === 0) {
    formattedSeconds = `00`;
    return formattedSeconds;
  }
  formattedSeconds = length > 1 ? seconds.toFixed() : `0${seconds}`;
  return formattedSeconds;
};

export const formatTime = (timeLeft: number) => {
  const minutes = Math.trunc(timeLeft / 60);
  const seconds = timeLeft % 60;
  const minuteString = formatMinutes(minutes);
  const secondsString = formatSeconds(seconds);
  return `${minuteString}:${secondsString}`;
};
