import { useEffect, useState } from "react";

import { FileUploadService } from "@/features/file-upload/services/file-upload.service";
import type { PreSignUrlType } from "@/features/file-upload/types/types";

export function usePresignUrlEffect(uploadStarted: boolean) {
  const [data, setData] = useState<PreSignUrlType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (uploadStarted) return;

    const fetchPresign = async () => {
      try {
        setLoading(true);
        const result = await FileUploadService.preSignUrlGenerator();

        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPresign();
  }, [uploadStarted]);

  return { data, loading, error };
}
