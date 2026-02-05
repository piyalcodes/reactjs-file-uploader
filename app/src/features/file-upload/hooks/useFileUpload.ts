import { useMutation } from "@tanstack/react-query";

import {
  FILE_STATUSES,
  type FileItem,
  type FileStatus,
} from "@/features/file-upload/types/types";
import { FileUploadService } from "@/features/file-upload/services/file-upload.service";

export function useFileUpload(
  onProgressUpdate: (id: string, progress: number, status?: FileStatus) => void,
) {

  const mutation = useMutation({
    mutationKey: ["file-upload"],
    mutationFn: async (fileItem: FileItem) => {
      setTimeout(() => {
        onProgressUpdate(fileItem.id, 0, FILE_STATUSES.UPLOADED);
      }, 100);

      setTimeout(async () => {
        const formData = new FormData();

        formData.append("file", fileItem.file);

        await FileUploadService.uploadFile(
          formData,
          "/upload",
          (percent: number) => {
            onProgressUpdate(fileItem.id, percent, FILE_STATUSES.UPLOADING);
          },
        );
      }, 200);

      setTimeout(() => {
        onProgressUpdate(fileItem.id, 100, FILE_STATUSES.COMPLETED);
      }, 500);

      setTimeout(() => {
        return { id: fileItem.id, filename: fileItem.file.name };
      }, 1000);
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
  });

  return mutation;
}
