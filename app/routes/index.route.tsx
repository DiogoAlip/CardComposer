import { Outlet } from "react-router";
import { Navbar } from "~/ui/NavBar.ui";
import { Footer } from "~/ui/Footer.ui";

export default function IndexRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}