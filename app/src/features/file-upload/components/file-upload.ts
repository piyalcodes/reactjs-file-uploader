import { imagekit } from "@/utils/imagekit";
import {
  FILE_STATUSES,
  type FileItem,
  type FileStatus,
  type PreSignUrlType,
} from "@/features/file-upload/types/types";

export function fileUpload() {
  const upload = async (
    file: FileItem,
    onProgressUpdate: (
      id: string,
      progress: number,
      status?: FileStatus,
    ) => void,
    preSignUrl: PreSignUrlType,
  ) => {
    try {
      const result = await imagekit.upload({
        file: file.file,
        fileName: file.file.name,
        folder: "/reactjs",
        token: preSignUrl.token,
        signature: preSignUrl.signature,
        expire: preSignUrl.expire,
      });

      onProgressUpdate(file.id, 100, FILE_STATUSES.PENDING_UPLOAD);

      return result;
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return { upload };
}
