import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
export async function getVideoDetails(id: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,contentDetails&key=${API_KEY}`
    );

    // Extract relevant information from the API response
    const videoDetails = response.data.items[0];
    console.log(videoDetails)
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

  if (!match) {
    return "00:00";
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export async function getPlaylistDetails(id: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${id}&key=${API_KEY}`
    );

    const playlistInfo = response.data.items[0];

    // const videosResponse = await axios.get(
    //   `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${id}&key=${API_KEY}`
    // );
    const videosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items(snippet(resourceId(videoId)))&type=video&videoCategoryId=10&maxResults=${playlistInfo.contentDetails.itemCount}&playlistId=${id}&key=${API_KEY}`
    );
    // console.log("not random", random)
    const videoItems = videosResponse.data.items;
    const idArray = videoItems.map(((item: any) => item.snippet.resourceId.videoId))    
    const totalDuration = await calculateTotalDuration(idArray);

    return {
      thumbnail: playlistInfo.snippet.thumbnails.medium.url,
      title: playlistInfo.snippet.title,
      duration: totalDuration,
      videoCount: playlistInfo.contentDetails.itemCount,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}


  const calculateTotalDuration = async (videoItems: string[]) => {
    let totalDuration = 0;
    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&fields=items(etag,id, contentDetails(duration))&id=${videoItems.join(",")}&key=${API_KEY}`
    );
    console.log(videoResponse)
    videoResponse.data.items.forEach((item: any) => {
      const videoDuration = item.contentDetails.duration;
        totalDuration += parseDuration(videoDuration);
    })
    // for (const item of videoResponse.data) {
    //   const videoId = item.contentDetails.videoId;
    //   const videoResponse = await axios.get(
    //     `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
    //   );

    //   const videoDetails = videoResponse.data.items[0];
    //   if (videoDetails){
    //     const videoDuration = videoDetails.contentDetails.duration;
  
    //     totalDuration += parseDuration(videoDuration);
    //   }
    // }

    return totalDuration;
  };

  const parseDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  };

