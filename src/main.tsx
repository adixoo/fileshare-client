import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./components/pages/home.tsx";
import ReceiveDirectory from "./components/pages/receiver/receiveDir.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Send from "./components/pages/send/send.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/receive-dir",
    element: <ReceiveDirectory />,
  },
  {
    path: "/send",
    element: <Send />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
