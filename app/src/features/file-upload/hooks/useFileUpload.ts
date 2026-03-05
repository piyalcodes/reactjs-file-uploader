import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FileUploadHandlerEvent } from "primereact/fileupload";

import {
  FILE_STATUSES,
  type FileItem,
  type FileStatus,
  type ImageKitResponse,
} from "@/features/file-upload/types/types";

import { useUploadCompleted } from "@/features/file-upload/hooks";
import { usePreSignUrlGenerator } from "@/features/file-upload/hooks/usePreSignUrlGenerator";
import { FileListService } from "@/features/file-list/services/file-list.services";

export function useFileUploadHandler() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadStarted, setUploadStarted] = useState(false);

  const navigate = useNavigate();
  const { data: presignUrl } = usePreSignUrlGenerator();
  const { upload } = FileListService.fileUpload();
  const uploadCompleteMutation = useUploadCompleted();

  const updateProgress = (
    id: string,
    progress: number,
    status?: FileStatus,
  ) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, progress, status: status ?? f.status } : f,
      ),
    );
  };

  async function handleUpload(event: FileUploadHandlerEvent) {
    const newFileItems: FileItem[] = event.files.map((file) => ({
      file,
      status: FILE_STATUSES.UPLOADING,
      progress: 0,
      id: crypto.randomUUID(),
    }));

    setFiles((prev) => [...prev, ...newFileItems]);
    setUploadStarted(true);

    if (presignUrl) {
      await Promise.all(
        newFileItems.map(async (f) => {
          const result: ImageKitResponse | undefined = await upload(
            f,
            updateProgress,
            presignUrl,
          );

          if (result) {
            await uploadCompleteMutation.mutateAsync(result);
          }
        }),
      );
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return {
    files,
    uploadStarted,
    handleUpload,
  };
}
