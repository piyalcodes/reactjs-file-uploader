import { useQuery } from "@tanstack/react-query";
import { FileUploadService } from "../services/file-upload.service";

export function usePreSignUrl() {
  return useQuery({
    queryKey: ["pre-sign-url"],
    queryFn: FileUploadService.preSignUrlGenerator,
  });
}
