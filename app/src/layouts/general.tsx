import { Link, Outlet } from "react-router-dom";

export function GeneralLayout() {
  return (
    <>
      <div>
        <Link to={"/"}>Home</Link> | <Link to={"/upload"}>Upload</Link>
      </div>

      <Outlet />
    </>
  );
}
