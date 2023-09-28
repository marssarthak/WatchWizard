"use client";
import { getCourses, getVideos } from "@/functions/apis";
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
  const videoId = searchParams.get("videoId");

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {}, [user?.emailAddresses, isLoaded, isSignedIn]);

  return (
    <section className="relative">
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Watch lecture below</h2>
            {/* <p className="text-xl text-gray-600">
              See all your Lectures below.
            </p> */}
          </div>
          <div>
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${videoId}?si=iYOH9qHFsb0ij-kI`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Toaster />
    </section>
  );
}
