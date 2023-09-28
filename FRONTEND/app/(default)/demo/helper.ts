import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
export async function getVideoDetails(id: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,contentDetails&key=${API_KEY}`
    );

    // Extract relevant information from the API response
    const videoDetails = response.data.items[0];
    const thumbnail = videoDetails.snippet.thumbnails.standard.url;
    const title = videoDetails.snippet.title;
    const duration = parseISO8601Duration(videoDetails.contentDetails.duration);

    // Set the extracted information to the state
    return { thumbnail, title, duration };
  } catch (e) {
    console.log(e);
    return null;
  }
}

const parseISO8601Duration = (duration: string) => {
  const match = duration.match(/^PT(\d+H)?(\d+M)?(\d+S)?$/);

  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return hours * 3600 + minutes * 60 + seconds;
};

export async function getPlaylistDetails(id: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${id}&key=${API_KEY}`
    );

    const playlistInfo = response.data.items[0];

    const videosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items(snippet(resourceId(videoId)))&type=video&videoCategoryId=10&maxResults=${playlistInfo.contentDetails.itemCount}&playlistId=${id}&key=${API_KEY}`
    );
    // console.log("not random", random)
    const videoItems = videosResponse.data.items;
    const idArray = videoItems.map(
      (item: any) => item.snippet.resourceId.videoId
    );
    const totalDuration = await calculateTotalDuration(idArray);
    const videos = await getVideosDetailsFromIds(idArray)


    return {
      thumbnail: playlistInfo.snippet.thumbnails.medium.url,
      title: playlistInfo.snippet.title,
      duration: totalDuration,
      videos: videos ,
      video_id: idArray,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const calculateTotalDuration = async (videoItems: string[]) => {
  let totalDuration = 0;
  const videoResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&fields=items(etag,id, contentDetails(duration))&id=${videoItems.join(
      ","
    )}&key=${API_KEY}`
  );
  // console.log(videoResponse);
  videoResponse.data.items.forEach((item: any) => {
    const videoDuration = item.contentDetails.duration;
    totalDuration += parseISO8601Duration(videoDuration);
  });

  return totalDuration;
};


const getVideosDetailsFromIds = async (videoItems: string[]) => {
  let totalDuration = 0;
  const videoResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&fields=items(etag,id,snippet(thumbnails,title),contentDetails(duration))&id=${videoItems.join(
      ","
    )}&key=${API_KEY}`
  );
  const videos = videoResponse.data.items.map((item: any) => {
    const thumbnail = item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url : null;
    const title = item.snippet.title;
    const duration = parseISO8601Duration(item.contentDetails.duration);
    return {
      thumbnail,
      title,
      duration,
      url: "https://www.youtube.com/watch?v=" + item.id,
      videoId: item.id
    }
  });

  return videos
};
