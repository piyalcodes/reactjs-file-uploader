import { createBrowserRouter } from "react-router-dom";

import { FileUpload } from "@/features/file-upload/pages/file-upload";
import { FileListPage } from "@/features/file-list/pages/file-list";
import { GeneralLayout } from "@/layouts/general";

const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      {
        path: "/",
        element: <FileListPage />,
      },
      {
        path: "/upload",
        element: <FileUpload />,
      },
    ],
  },
]);

export default router;
