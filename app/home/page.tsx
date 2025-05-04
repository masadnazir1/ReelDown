"use client";

import styles from "./page.module.css";
import { useState } from "react";
import DownloadModal from "../components/DownloadModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [videoMeta, setVideoMeta] = useState({ title: "", thumbnail: "" });
  const [isLoading,setisLoading]=useState(false)

  const handleDownload = async () => {
   
    if (!videoUrl) return alert("Please paste a valid link");
    setisLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data = await res.json();
      setisLoading(false)

      setFormats(data.formats || []);
      setVideoMeta({ title: data.title, thumbnail: data.thumbnail });
      setShowModal(true);
    } catch (error) {
      console.error("Download failed", error);
      setisLoading(false)
      alert("Something went wrong!");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.header}>FB Saver</h1>
        <input
          type="text"
          placeholder="Paste link to download"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleDownload} className={styles.downloadBtn}>
          {isLoading?"Loading... ":"Download"}
          
        </button>
      </div>

      {showModal && (
        <DownloadModal
          onClose={() => setShowModal(false)}
          formats={formats}
          meta={videoMeta}
        />
      )}
    </div>
  );
}
