import { ApiRoutes } from "@/constants/constant";
import axios from "axios";
import toast from "react-hot-toast";

export async function getUserId(email: string) {
  try {
    const response = await axios.get(ApiRoutes.user + "?email=" + email);
    return response.data;
  } catch (e: any) {
    if (e.message) {
      toast.error(e.message);
    }
  }
}
export async function createUser(email: string) {
  const response = await axios.post(ApiRoutes.user, {
    email,
  });
  return response;
}

export async function addCourse(
  email: string,
  title: string,
  video_id: string[],
  videos: object[],
  duration: number,
  thumbnail: string
) {
  try {
    const { id } = await getUserId(email);
    if (!id) return;

    const response = await axios.post(ApiRoutes.course + "/" + id, {
      title,
      video_id,
      videos,
      duration,
      thumbnail,
    });

    return response.data;
  } catch (e: any) {
    if (e.message) {
      toast.error(e.message);
    }
  }
}

export async function getCourses(email: string) {
  try {
    const { id } = await getUserId(email);
    if (!id) return;

    const response = await axios.get(ApiRoutes.course + "/" + id);

    return response.data;
  } catch (e: any) {
    if (e.message) {
      toast.error(e.message);
    }
  }
}


export async function getVideos(email: string) {
  try {
    const { id } = await getUserId(email);
    if (!id) return;

    const response = await axios.get(ApiRoutes.video + "/" + id);

    return response.data;
  } catch (e: any) {
    if (e.message) {
      toast.error(e.message);
    }
  }
}
