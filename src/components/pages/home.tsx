import { Download03Icon, SentIcon } from "../icon";

import { Link } from "react-router-dom";

import { signal } from "@preact/signals-react";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

export const SelectedFiles = signal<File[] | null>(null);

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput?.click();
  };

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files) {
      SelectedFiles.value = Array.from(files);
      console.log(SelectedFiles.value);
      navigate("/send");
    }
  }

  return (
    <>
      <main className="mx-auto flex h-dvh w-full items-center justify-center gap-3">
        <button
          onClick={handleClick}
          className="flex h-40 w-32 flex-col items-center justify-center gap-1 rounded-3xl bg-indigo-500 font-medium text-white transition-colors hover:bg-indigo-600"
        >
          <SentIcon className="size-9 text-white" />
          Send
        </button>

        <Link to="/receive-dir">
          <button className="flex h-40 w-32 flex-col items-center justify-center gap-1 rounded-3xl bg-indigo-500 font-medium text-white transition-colors hover:bg-indigo-600">
            <Download03Icon className="size-9 text-white" />
            Receive
          </button>
        </Link>
      </main>
      <input
        type="file"
        id="file-input"
        className="hidden"
        multiple
        onChange={handleFileInputChange}
      />
      <label htmlFor="file-input"></label>
    </>
  );
}
