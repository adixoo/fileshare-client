import { useEffect, useState } from "react";
import { Contants } from "@/utils/contants";

import { useSearchParams } from "react-router-dom";
import {
  FcDownload,
  FcPicture,
  FcClapperboard,
  FcDocument,
  FcMusic,
  FcMultipleDevices,
  FcFolder,
} from "react-icons/fc";
// components

import FileList from "./FileList";

import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
interface DirectoryData {
  directories: { name: string; path: string }[];
  drives: string[];
  os: string;
}

const Icons: { [key: string]: JSX.Element } = {
  Downloads: <FcDownload className="size-7" />,
  Videos: <FcClapperboard className="size-7" />,
  Pictures: <FcPicture className="size-7" />,
  Documents: <FcDocument className="size-7" />,
  Music: <FcMusic className="size-7" />,
  Desktop: <FcMultipleDevices className="size-7" />,
};

export default function ReceiveDirectory() {
  //@ts-ignore
  let [searchParams, setSearchParams] = useSearchParams();

  const path = searchParams.get("path");

  return <>{path ? <FileList /> : <ReceiveDirectoryHome />}</>;
}

function ReceiveDirectoryHome() {
  const [directoryData, setDirectoryData] = useState<DirectoryData | null>(
    null,
  );

  useEffect(() => {
    fetch(Contants.Server + "default-files")
      .then((response) => response.json())
      .then((data: DirectoryData) => setDirectoryData(data))
      .catch((error) => console.error("Error fetching directory data:", error));
  }, []);
  const desktop = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4">
        <h1 className="mt-12 text-2xl font-bold">Receive File</h1>
        {directoryData ? (
          <>
            <h2 className="pb-6 pt-6 font-semibold">Frequent Folders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {directoryData.directories.map((dir) => (
                <Link
                  key={dir.name}
                  to={`/receive-dir?path=${dir.path}`}
                  className="block"
                >
                  <Button
                    className="h-16 w-full justify-start gap-3 rounded-2xl max-sm:p-0"
                    variant={desktop ? "outline" : "ghost"}
                  >
                    {Icons[dir.name]} {dir.name}
                  </Button>
                </Link>
              ))}
            </div>
            <h2 className="pb-6 pt-12 font-semibold">All Drives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {directoryData.drives.map((dir) => (
                <Link
                  key={dir}
                  to={`/receive-dir?path=${dir}`}
                  className="block"
                >
                  <Button
                    className="h-16 w-full justify-start gap-3 rounded-2xl max-sm:p-0"
                    variant={desktop ? "outline" : "ghost"}
                  >
                    <FcFolder className="size-7" />
                    Disk ({dir})
                  </Button>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p>Loading directory data...</p>
        )}
      </main>
    </>
  );
}
