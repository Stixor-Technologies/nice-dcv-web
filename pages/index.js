import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DCVViewerComponent = dynamic(() => import("../components/dcv"), {
  ssr: false,
});

export default function Home() {
  return <DCVViewerComponent />;
}
