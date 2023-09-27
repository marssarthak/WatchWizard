"use client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "https://mint-my-words.onrender.com/users/";

export default function FeaturesBlocks() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [contentType, setContentType] = React.useState<string>("");
  const [imagePrompt, setimagePrompt] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const handleChange = (event: SelectChangeEvent<typeof contentType>) => {
    setContentType(event.target.value);
  };

  const [error, setError] = React.useState<string | null>(null)



  async function mintNft() {
    if (!contentType) {
      toast.error("Choose Image type");
      return false;
    }
    if (!imagePrompt) {
      toast.error("Enter Image Prompt");
      return false;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("You are not logged in. Login to continue");
      return false;
    }
    if (!user?.fullName) {
      toast.error("Your Name is not given in your Gmail.");
      return false;
    }

    const profileName = user.fullName;
    const profileEmail = user?.primaryEmailAddress?.emailAddress;

    try {
      setLoading(true);

      await mintNFTSimulator(
        profileName,
        profileEmail,
        imagePrompt,
        contentType
      );
      setLoading(false);
      toast.success(
        "success! You will receive NFT on yoru mail within a minute"
      );
    } catch (error: any) {
      setLoading(false);
      toast.error("Error: " + error.message);
      console.log(error);
    }
  }

  async function mintNFTSimulator(
    name: string,
    email: string,
    prompt: string,
    type: string
  ) {
    try {
      const user = await checkUserExistence(name, email);
      console.log("user", user);
      // if (type === "ai") {
      //   const nft = await mintAINft(email, prompt);
      //   console.log("minted ai nft", nft);
      // } else {
      //   const nft = await mintBannerNFT(email, prompt);
      //   console.log("minted banner nft", nft);
      // }
    } catch (error) {
      throw error;
    }
  }

  async function checkUserExistence(name: string, email: string) {
    try {
      const response = await axios.get(BASE_URL + email);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return createUser(name, email);
      } else {
        throw error;
      }
    }
  }
  async function createUser(name: string, email: string) {
    try {
      let obj = {
        name,
        email,
      };
      const response = await axios.post(BASE_URL + "create", obj);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


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

  React.useEffect(() => {
    setError(null)

    const result = extractYouTubeId(imagePrompt);

    if (result) {
      console.log(`Type: ${result.type}, ID: ${result.id}`);
    } else {
      if (imagePrompt) setError("Invalid YouTube URL")
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
              id="outlined-textarea"
              label={`Paste your youtube video or playlist link here`}
              fullWidth
              value={imagePrompt}
              onChange={(e) => setimagePrompt(e.target.value)}
              sx={{ marginTop: 2 }}
              error={!!error}
              helperText={error ? error : undefined}
            />
            <div className="mt-8 w-full flex justify-center items-center">
              <button
                onClick={mintNft}
                disabled={loading}
                className="py-4 px-10 mx-auto text-white bg-blue-600 hover:bg-blue-700  rounded-md text-sm disabled:opacity-60"
              >
                Start Course
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
