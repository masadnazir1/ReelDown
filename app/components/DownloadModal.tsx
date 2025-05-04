import styles from "./DownloadModal.module.css";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";

interface Format {
  format_id: string;
  ext: string;
  quality: string;
  download_url: string;
}

interface Props {
  onClose: () => void;
  formats: Format[];
  meta: { title: string; thumbnail: string };
}

export default function DownloadModal({ onClose, formats, meta }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && overlayRef.current) {
      gsap.fromTo(modalRef.current, { y: "100%" }, { y: "0%", duration: 0.5 });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, []);

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={onClose}>
      <div className={styles.modal} ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalHeader}>{meta.title}</h2>
        <img src={meta.thumbnail} alt="Thumbnail" className={styles.thumbnail} style={{width:'100%',height:"200px"}}/>
        {/* ///// */}

        
        <p style={{margin:'15px',textAlign:'center',fontWeight:'bold'}}>Click the Format to download the video</p>
        <div className={styles.qualityGrid}>

         
          {formats.map((f) => (
            <button
              key={f.format_id}
              onClick={() => handleDownload(f.download_url)}
              className={styles.qualityBtn}
            >

              <img src="https://cdn-icons-png.flaticon.com/128/724/724933.png" width={30} height={30} alt="Download"/>
              {f.quality || f.ext.toUpperCase()}

            </button>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.saveBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}
