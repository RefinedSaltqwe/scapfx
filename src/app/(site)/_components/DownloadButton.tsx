import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";

const Loader = lazy(() => import("@/components/Loader"));

type DownloadButton = {
  fileName: string;
};

export default function DownloadButton({ fileName }: DownloadButton) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/download-zip?fileName=${fileName}.zip`);
      const text: string = await res.text();
      const data = (await JSON.parse(text)) as { url: string };

      if (res.ok && data.url) {
        // Trigger the download by redirecting to the file URL
        const a = document.createElement("a");
        a.href = data.url;
        a.download = fileName; // Specify the filename you want to download
        a.click();
      } else {
        console.log(data.url);
        setError("Error fetching file.");
      }
    } catch (error) {
      console.error("Download error:", error);
      setError("Error fetching file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant={"default"} onClick={handleDownload} disabled={loading}>
        {loading ? (
          <Loader classNames="h-4 w-4 border-2 border-primary-foreground/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
        ) : (
          <>
            Download<span aria-hidden="true"> &rarr;</span>
          </>
        )}
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
}
