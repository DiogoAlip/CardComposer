import { Outlet } from "react-router";
import { Navbar } from "~/shared/components/NavBar.ui";
import { Footer } from "~/shared/components/Footer.ui";

export default function IndexRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}