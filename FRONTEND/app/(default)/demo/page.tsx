"use client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import { getPlaylistDetails, getVideoDetails } from "./helper";
import { useBoolean } from "usehooks-ts";
import CircularProgress from "@mui/material/CircularProgress";
import { addCourse } from "@/functions/apis";

const BASE_URL = "https://mint-my-words.onrender.com/users/";

export default function FeaturesBlocks() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [imagePrompt, setimagePrompt] = React.useState<string>("");
  const [courseTitle, setCourseTitle] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const { value: loading, setValue: setLoading } = useBoolean();
  const { value: videoLoading, setValue: setvideoLoading } = useBoolean();

  const [videoData, setVideoData] = React.useState<{ type: string; data: any }>(
    { type: "", data: null }
  );

  function extractYouTubeId(url: string) {
    const videoUrlPattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const playlistUrlPattern =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|playlist\?list=)([a-zA-Z0-9_-]{34})/;

    const videoMatch = url.match(videoUrlPattern);
    const playlistMatch = url.match(playlistUrlPattern);

    // Extract and return the video ID or playlist ID
    if (videoMatch && videoMatch[1]) {
      return { type: "video", id: videoMatch[1] };
    } else if (playlistMatch && playlistMatch[1]) {
      return { type: "playlist", id: playlistMatch[1] };
    } else {
      return null; // URL doesn't match video or playlist pattern
    }
  }

  async function handleSubmit() {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) return;

    if (videoData.type === "playlist"){
      await addCourse(email, courseTitle, videoData.data.video_id, videoData.data.videos, videoData.data.duration )
    }
  }

  React.useEffect(() => {
    setError(null);
    setVideoData({
      type: "",
      data: null,
    });

    const result = extractYouTubeId(imagePrompt);

    if (result) {
      console.log(`Type: ${result.type}, ID: ${result.id}`);
      if (result.type === "video") {
        setvideoLoading(true);
        getVideoDetails(result.id)
          .then((data) => {
            setVideoData({
              type: result.type,
              data: data,
            });
            console.log(data);
          })
          .finally(() => {
            setvideoLoading(false);
          });
      } else {
        setvideoLoading(true);
        getPlaylistDetails(result.id)
          .then((data) => {
            setVideoData({
              type: result.type,
              data: data,
            });

            console.log("playlist data", data)
          })
          .finally(() => {
            setvideoLoading(false);
          });
      }
    } else {
      if (imagePrompt) setError("Invalid YouTube URL");
    }
  }, [imagePrompt]);

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Test Our Project</h2>
            {/* <p className="text-xl text-gray-600">
            </p> */}
          </div>

          <div className="max-w-xl mx-auto pb-12 md:pb-20">
            <TextField
              label={`Course Title`}
              fullWidth
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              sx={{ marginTop: 2 }}
            />
            <TextField
              id="outlined-textarea"
              label={`Paste your youtube video or playlist link here`}
              fullWidth
              value={imagePrompt}
              onChange={(e) => setimagePrompt(e.target.value)}
              sx={{ marginTop: 2 }}
              error={!!error}
              helperText={error ? error : undefined}
            />

            {videoLoading ? (
              <div className="pt-5 flex items-center justify-center ">
                <CircularProgress sx={{ width: "12px", height: "12px" }} />
              </div>
            ) : null}

            {videoData.data ? (
              <div className="pt-5">
                <div className="mb-2">
                  <p>
                    {videoData.data.title} ({videoData.data.duration})
                  </p>
                </div>
                <div className="w-full">
                  <img
                    src={videoData.data.thumbnail}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-8 w-full flex justify-center items-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="py-4 px-10 mx-auto text-white bg-blue-600 hover:bg-blue-700  rounded-md text-sm disabled:opacity-60"
              >
                Start Course
              </button>
            </div>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/2JQn9QxU1-s?si=1lsYrkpHwYmhJ1KJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
