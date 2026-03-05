import { useEffect, useState } from "react";

import { FileListService } from "@/features/file-list/services/file-list.services";
import {
  FILE_STATUSES,
  type FileItem,
  type FileStatus,
} from "@/features/file-upload/types/types";
import type { FileListSSE } from "@/features/file-list/types/file-list.types";

export function useFileListSSE() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [status, setStatus] = useState<FileStatus>(FILE_STATUSES.PROCESSING);

  useEffect(() => {
    const es = FileListService.subscribeToFileList(
      "/events",
      (data: FileListSSE) => {
        setFiles(data.files);
      },
    );

    es.onopen = () => setStatus(FILE_STATUSES.PROCESSING);
    es.onerror = () => setStatus(FILE_STATUSES.FAILED);

    return () => es.close();
  }, []);

  return { files, status };
}
