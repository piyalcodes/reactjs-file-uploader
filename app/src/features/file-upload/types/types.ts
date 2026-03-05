export const FILE_STATUSES = {
  PENDING_UPLOAD: "PENDING_UPLOAD",
  UPLOADING: "UPLOADING",
  UPLOADED: "UPLOADED",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type FileStatus = (typeof FILE_STATUSES)[keyof typeof FILE_STATUSES];

export interface FileItem {
  file: File;
  status: FileStatus;
  progress: number;
  id: string;
  size?: number;
  mime_type?: string;
  name?: string;
  fileId?: string;
  url?: string;
  fileType?: string;
}

export type PreSignUrlType = {
  token: string;
  signature: string;
  expire: number;
};

export type ImageKitResponse = {
  fileId: string;
  filePath: string;
  fileType: string;
  name: string;
  size: number;
  url: string;
  AITags?: object[];
  description?: string;
};
