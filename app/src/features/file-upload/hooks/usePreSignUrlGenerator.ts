import { useQuery } from "@tanstack/react-query";
import { FileUploadService } from "../services/file-upload.service";

export function usePreSignUrlGenerator() {
  return useQuery({
    queryKey: ["pre-sign-url"],
    queryFn: FileUploadService.preSignUrlGenerator,
  });
}
