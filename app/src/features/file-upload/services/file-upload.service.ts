import { api } from "@/services/api";

export const FileUploadService = {
  uploadFile: async (
    file: FormData,
    presignedUrl: string,
    onProgress?: (percent: number) => void,
  ): Promise<void> => {
    return await api.post<void>(presignedUrl, file, {
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total ?? 1;
        const percent = Math.round((loaded / total) * 100);
        onProgress?.(percent);
      },
    });
  },
};
