import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type FileUploadHandlerEvent,
  FileUpload as FileUploader,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";

import {
  FILE_STATUSES,
  type FileItem,
  type FileStatus,
} from "@/features/file-upload/types/types";
import { useFileUpload } from "@/features/file-upload/hooks/useFileUpload";

import "primereact/resources/themes/lara-light-cyan/theme.css";

export function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadStarted, setUploadStarted] = useState(false);

  const navigate = useNavigate();

  const updateProgress = (
    id: string,
    progress: number,
    status?: FileStatus,
  ) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              progress,
              status: status ?? f.status,
            }
          : f,
      ),
    );
  };

  const { mutateAsync } = useFileUpload(updateProgress);

  async function handleUpload(event: FileUploadHandlerEvent) {
    const newFileItems: FileItem[] = event.files.map((file) => ({
      file,
      status: FILE_STATUSES.UPLOADING,
      progress: 0,
      id: crypto.randomUUID(),
    }));
    setFiles((prev) => [...prev, ...newFileItems]);

    setUploadStarted(true);

    await Promise.all(newFileItems.map((f) => mutateAsync(f)));

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div style={{ width: "100%" }}>
      <FileUploader
        accept="application/pdf"
        customUpload
        uploadHandler={handleUpload}
        multiple
        emptyTemplate={<p>Drag & drop files here</p>}
        contentClassName="hidden"
        className={uploadStarted ? "hide-fileupload-content" : ""}
      />

      {files.map((f) => (
        <div key={f.id} style={{ marginTop: 12 }}>
          <div>{f.file.name}</div>
          <ProgressBar value={f.progress} />
          <small>{f.status}</small>
        </div>
      ))}
    </div>
  );
}
