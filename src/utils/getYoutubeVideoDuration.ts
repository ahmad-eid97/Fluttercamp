import axios from "axios";

export default async function getYoutubeVideoDuration(id: string) {
  const data = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=contentDetails&id=${id}`);

  const duration = { hours: 0, minutes: 0, seconds: 0 };
  const durationParts = data.data.items[0].contentDetails.duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  if (durationParts.length === 3) {
    duration["hours"] = durationParts[0];
    duration["minutes"] = durationParts[1];
    duration["seconds"] = durationParts[2];
  }

  if (durationParts.length === 2) {
    duration["minutes"] = durationParts[0];
    duration["seconds"] = durationParts[1];
  }

  if (durationParts.length === 1) {
    duration["seconds"] = durationParts[0];
  }

  return {
    ...duration,
    string: `${duration.hours > 0 ? duration.hours + 'h : ' : ''}${duration.minutes}m : ${duration.seconds}s`,
  };
}