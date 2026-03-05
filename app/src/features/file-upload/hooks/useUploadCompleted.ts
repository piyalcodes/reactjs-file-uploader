import { useMutation } from "@tanstack/react-query";

import { FileUploadService } from "@/features/file-upload/services/file-upload.service";
import type { ImageKitResponse } from "@/features/file-upload/types/types";

export function useUploadCompleted() {
  return useMutation({
    mutationFn: (result: ImageKitResponse) =>
      FileUploadService.payloadUpload(
        JSON.stringify({
          fileId: result.fileId,
          url: result.url,
          name: result.name,
          size: result.size,
          mime: result.fileType,
        }),
      ),
  });
}
