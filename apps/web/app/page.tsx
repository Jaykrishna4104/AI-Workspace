"use client";

import { useEffect, useState } from "react";

type ProjectInfo = {
  project: string;
  version: string;
  status: string;
  developer: string;
  message: string;
};

export default function Home() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setProjectInfo(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1>🚀 AI Workspace</h1>

      <h2>Welcome JK 👋</h2>

      <p>This is our AI Workspace Dashboard.</p>

      <p>Frontend Status: ✅ Running</p>

      {projectInfo ? (
        <>
          <p>Backend Status: ✅ {projectInfo.status}</p>

          <p>Project: {projectInfo.project}</p>

          <p>Version: {projectInfo.version}</p>

          <p>Developer: {projectInfo.developer}</p>

          <p>{projectInfo.message}</p>
        </>
      ) : (
        <p>Connecting to Backend...</p>
      )}
    </main>
  );
}