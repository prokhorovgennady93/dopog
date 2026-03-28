"use client";

import { useState, useEffect } from "react";
import { CloudDownload, CheckCircle2, Loader2, Lock } from "lucide-react";

interface DownloadTopicButtonProps {
  topicId: string;
  topicTitle: string;
  hasAccess: boolean;
}

export function DownloadTopicButton({ topicId, topicTitle, hasAccess }: DownloadTopicButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "downloaded" | "error" | "locked">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!hasAccess) {
      setStatus("locked");
      return;
    }
    // Check if already downloaded
    const checkStatus = () => {
      const isDownloaded = localStorage.getItem(`topic_${topicId}_offline`) === "true";
      if (isDownloaded) setStatus("downloaded");
      else setStatus("idle");
    };
    checkStatus();
  }, [topicId, hasAccess]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasAccess) {
      alert("Функция скачивания доступна только в Premium-версии.");
      return;
    }

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
          : status === "locked"
          ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300 opacity-60"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-orange-500 hover:text-orange-600 active:scale-95 shadow-sm"
      }`}
      title={status === "locked" ? "Доступно в Premium" : (status === "downloaded" ? "Доступно офлайн" : "Скачать для работы без интернета")}
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
      ) : status === "locked" ? (
        <>
          <Lock className="w-3.5 h-3.5" />
          <span>Premium</span>
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
