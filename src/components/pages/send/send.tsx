import { ChangeEvent } from "react";

import { FcFile, FcUpload } from "react-icons/fc";
import { SelectedFiles } from "../home";
import { Button } from "@/components/ui/button";
import { SentIconFill, Cancel01Icon } from "@/components/icon";

const removeFiles = () => {
  SelectedFiles.value = null;
};
export default function Send() {
  return (
    <>
      {/* Your component content here */}
      <main className="mx-auto max-w-5xl px-4 py-16">
        {SelectedFiles.value ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Button
                  onClick={removeFiles}
                  variant={"outline"}
                  className="w-full max-w-48"
                >
                  <Cancel01Icon className="mr-2 size-5" />
                  {SelectedFiles.value.length} Selected
                </Button>
              </div>
              <div className="flex justify-end">
                <Button className="w-full max-w-48">
                  Send <SentIconFill className="ml-2 size-5" />
                </Button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SelectedFiles.value.map((file) => {
                return (
                  <button
                    key={file.name}
                    className="flex items-center gap-2 truncate rounded-2xl bg-white p-4 text-left font-medium"
                  >
                    <FcFile className="min-h-8 min-w-8" />
                    <span>
                      {file.name}
                      <span className="block text-sm font-normal text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <FileInput />
        )}
      </main>
    </>
  );
}

function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
  const fileInput = event.target;
  const files = fileInput.files;

  if (files) {
    SelectedFiles.value = Array.from(files);
    console.log(SelectedFiles.value);
  }
}
const handleClick = () => {
  const fileLabel = document.getElementById("file-label");
  fileLabel?.click();
};
function FileInput() {
  return (
    <>
      <label htmlFor="file-input" id="file-label"></label>
      <input
        type="file"
        id="file-input"
        className="hidden"
        multiple
        onChange={handleFileInputChange}
      />
      <button
        onClick={handleClick}
        className="mx-auto flex h-screen max-h-96 w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-primary bg-primary/5"
      >
        <FcUpload className="size-20" />
        Click to Select File <br />
        (or Drag and Drop)
      </button>
    </>
  );
}
