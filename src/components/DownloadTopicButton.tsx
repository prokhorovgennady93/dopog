"use client";

import { useState, useEffect } from "react";
import { CloudDownload, CheckCircle2, Loader2, WifiOff } from "lucide-react";

interface DownloadTopicButtonProps {
  topicId: string;
  topicTitle: string;
}

export function DownloadTopicButton({ topicId, topicTitle }: DownloadTopicButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "downloaded" | "error">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already downloaded
    const checkStatus = () => {
      const isDownloaded = localStorage.getItem(`topic_${topicId}_offline`) === "true";
      if (isDownloaded) setStatus("downloaded");
    };
    checkStatus();
  }, [topicId]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "downloaded") return;

    setStatus("downloading");
    setProgress(0);

    try {
      // 1. Fetch Question Data
      const response = await fetch(`/api/topics/${topicId}/questions`);
      const questions = await response.json();

      if (!response.ok) throw new Error("Failed to fetch questions");

      // 2. Cache Data in LocalStorage (Simple JSON store)
      localStorage.setItem(`topic_${topicId}_data`, JSON.stringify(questions));

      // 3. Cache Images in CacheStorage
      if ("caches" in window) {
        const cache = await caches.open("dopog-questions-images");
        const imageUrls = questions
          .map((q: any) => q.imageUrl)
          .filter((url: string | null) => url && url.length > 0);

        for (let i = 0; i < imageUrls.length; i++) {
          try {
            await cache.add(imageUrls[i]);
          } catch (e) {
            console.warn(`Failed to cache image: ${imageUrls[i]}`, e);
          }
          setProgress(Math.round(((i + 1) / imageUrls.length) * 100));
        }
      }

      localStorage.setItem(`topic_${topicId}_offline`, "true");
      setStatus("downloaded");
    } catch (error) {
      console.error("Download failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={status === "downloading"}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-black uppercase tracking-widest ${
        status === "downloaded"
          ? "bg-green-500/10 border-green-500/20 text-green-600 cursor-default"
          : status === "downloading"
          ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-orange-500 hover:text-orange-600 active:scale-95"
      }`}
      title={status === "downloaded" ? "Доступно офлайн" : "Скачать для работы без интернета"}
    >
      {status === "downloading" ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{progress}%</span>
        </>
      ) : status === "downloaded" ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Скачано</span>
        </>
      ) : (
        <>
          <CloudDownload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Офлайн</span>
        </>
      )}
    </button>
  );
}
