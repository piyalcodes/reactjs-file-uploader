import { FileUpload as FileUploader } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useFileUploadHandler } from "@/features/file-upload/hooks/useFileUpload";

export function FileUpload() {
  const { files, uploadStarted, handleUpload } = useFileUploadHandler();

  return (
    <div style={{ width: "100%" }}>
      <FileUploader
        accept="application/pdf"
        customUpload
        uploadHandler={handleUpload}
        multiple
        emptyTemplate={<p>Drag & drop files here</p>}
        contentClassName="hidden"
        className={uploadStarted ? "hide-fileupload-content" : ""}
      />

      {files.map((f) => (
        <div key={f.id} style={{ marginTop: 12 }}>
          <div>{f.file.name}</div>
          <ProgressBar value={f.progress} />
          <small>{f.status}</small>
        </div>
      ))}
    </div>
  );
}
