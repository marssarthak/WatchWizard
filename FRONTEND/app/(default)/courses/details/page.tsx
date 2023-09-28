"use client";
import { getCourses } from "@/functions/apis";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PieChartWithCenterLabel from "@/components/ui/duratoin-chart";
import Link from "next/link";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [courseData, setCourseData] = useState<any[]>([]);
  const { isLoaded, isSignedIn, user } = useUser();

  console.log(courseData)

  useEffect(() => {
    async function fetchData(email: string) {
      const newData = await getCourses(email);
      return newData;
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchData(user.primaryEmailAddress?.emailAddress).then((data) => {
            const courseData = data.find((item: any )=> item.courseItems[0].title == title)
          setCourseData(courseData.courseItems[0])
      }
      );
    } else {
      if (isLoaded) toast.error("You are not logged in. Login to continue");
    }
  }, [user?.emailAddresses, isLoaded, isSignedIn]);

  return (
    <section className="relative">
    <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 className="h2 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">See all your Lectures below.</p>
        </div>

        {/* Items */}
        {/* <div className="max-w-sm mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-1 items-start md:max-w-2xl lg:max-w-none">
          {courseData.video_id.map((item) => (
            <NftCard
              nftData={item.courseItems[0]}
              key={item.id}
              setopen={setNft}
            />
          ))}
        </div> */}
      </div>
    </div>

    <Toaster />
  </section>
  );
}

function NftCard({ nftData, setopen }: any) {
    let imageUrl = "";
  
    if (nftData.thumbnail) {
      imageUrl = nftData.thumbnail;
    } else {
      imageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
    }
  
    console.log(nftData);
    return (
      <div className="relative flex gap-4 justify-between p-6 bg-white rounded-lg shadow-xl">
        <div className="flex gap-4 items-start">
          <img
            src={imageUrl}
            className="w-72 h-auto"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
            }}
          />
  
          <div>
            <p className="text-gray-600 w-full mt-0">{nftData.title}</p>
            <div className="w-full">
              <Link
                className="p-1 px-8 text-white bg-blue-600 hover:bg-blue-700 mt-2 rounded-md text-sm"
                href={{ pathname: "/courses/details", query: { title: nftData.title } }}
              >
                open
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 mr-5">
          <PieChartWithCenterLabel completed={0} remaining={nftData.duration} />
        </div>
      </div>
    );
  }