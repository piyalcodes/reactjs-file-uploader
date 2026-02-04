import { createBrowserRouter } from "react-router-dom";
import { FileListPage } from "./features/file-list/pages/file-list";
import { GeneralLayout } from "./layouts/general";

const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    children: [
      {
        path: "/",
        element: <FileListPage />,
      },
    ],
  },
]);

export default router;
