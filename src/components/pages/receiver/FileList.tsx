import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useSearchParams } from "react-router-dom";

import { Contants } from "@/utils/contants";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FcFile, FcFolder } from "react-icons/fc";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
interface Root {
  files: File[];
  hasMore: boolean;
  path: string;
}

interface File {
  directory: boolean;
  modification: string;
  name: string;
  size: number;
  type: string;
}

function getPathSegments(path: string) {
  const d = path.split("\\");
  const mainDirectory = d[0] + "\\";

  return [mainDirectory, ...d.slice(1)].filter(Boolean);
}

export default function FileList() {
  let [searchParams] = useSearchParams();
  const path = searchParams.get("path") || "";
  const pathSegments = getPathSegments(path);
  const [directoryData, setDirectoryData] = useState<Root | null>(null);
  const [directories, setDirectories] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    fetch(Contants.Server + `files?path=${path}&limit=50`)
      .then((response) => response.json())
      .then((data: Root) => {
        setDirectoryData(data);

        // Group files and directories
        const dirs = data.files.filter((item) => item.directory);
        const regularFiles = data.files.filter((item) => !item.directory);

        setDirectories(dirs);
        setFiles(regularFiles);
      })
      .catch((error) => console.error("Error fetching directory data:", error));
  }, [path]);

  const desktop = useMediaQuery("(min-width: 640px)");
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumb className="mb-5">
          <BreadcrumbList className="flex-nowrap overflow-x-auto text-nowrap pb-5 pr-5">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/receive-dir`} className="ml-2">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {pathSegments.map((segment, index) => (
              <>
                {index < pathSegments.length - 1 ? (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink asChild>
                        <Link
                          to={`/receive-dir?path=${pathSegments.slice(0, index + 1).join("\\")}`}
                          className="ml-2"
                        >
                          {segment}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {directories.length > 0 && (
          <div className="mb-6 mt-4">
            <h2 className="mb-6 text-lg font-semibold">Directories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {directories.map((dir) => (
                <Link
                  key={dir.name}
                  to={`/receive-dir?path=${directoryData?.path + "\\" + dir.name}`}
                  className="block"
                >
                  <Button
                    className="h-16 w-full justify-start gap-3 rounded-2xl max-sm:p-0"
                    variant={desktop ? "outline" : "ghost"}
                  >
                    <FcFolder className="min-h-6 min-w-6" />{" "}
                    <span className="truncate">{dir.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="mb-6 text-lg font-semibold">Files</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {files.map((file) => (
                <a
                  key={file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    Contants.Server +
                    `download?path=${directoryData?.path + "\\" + file.name}`
                  }
                  className="block"
                >
                  <Button
                    className="h-16 w-full justify-start gap-3 rounded-2xl max-sm:p-0"
                    variant={desktop ? "outline" : "ghost"}
                  >
                    <FcFile className="min-h-6 min-w-6" />
                    <span className="truncate">{file.name}</span>
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
