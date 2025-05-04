"use client"
//
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./Assets/logo.png"

export default function Home() {
  const Router = useRouter()
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <Image src={logo} width={200} height={100} alt="ReelDown" loading="lazy"/> 
        </div>
        <h1 className={styles.title}>Welcome to Facebook Video Saver</h1>
        <p className={styles.subtitle}>
          A convenient tool to save videos from your Facebook feed with ease.
        </p>
        <button className={styles.button} onClick={(()=>Router.push("/home"))}>Continue</button>
        <p className={styles.policy}>
          By tapping 'Continue' you confirm that you agree with our privacy policy.
        </p>
      </div>
    </div>
  );
}
