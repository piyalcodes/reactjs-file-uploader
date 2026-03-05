import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";

import type { FileItem } from "@/features/file-upload/types/types";
import { useFileListSSE } from "@/features/file-list/hooks/useFileListEvent";

export function FileListPage() {
  const { files } = useFileListSSE();

  const fileSize = (value: FileItem) => {
    const size = value && value.size ? Math.round(value.size / 1024) : 0;
    return <div>{size} Mb</div>;
  };

  const fileType = (value: FileItem) => {
    return <div>{value.mime_type}</div>;
  };

  const statusDetails = (value: FileItem) => {
    return (
      <div>
        {" "}
        <Badge value={value.status}></Badge>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={files}
        footer={`In total there are ${files ? files.length : 0} files.`}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="filename" header="Name"></Column>
        <Column field="mime_type" header="Type" body={fileType}></Column>
        <Column header="Size" field="size" body={fileSize}></Column>
        <Column header="Status" field="status" body={statusDetails}></Column>
      </DataTable>
    </div>
  );
}
