import { api } from "@/services/api";
import type { FileListSSE } from "@/features/file-list/types/file-list.types";

export const FileListServce = {
  subscribeToFileList: (url: string, callback: (data: FileListSSE) => void) => {
    return api.sse(url, (data) => {
      callback(data as FileListSSE);
    });
  },
};
