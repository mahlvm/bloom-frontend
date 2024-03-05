import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";


import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";
import MyOffersPage from "./pages/ManageHelpRequestPages/MyOffersPage/MyOffersPage";

const router = createBrowserRouter([
    {
        path: "/messages",
        element: <MessagePage />,
    },
    {
        path: "/request_management/received_offers",
        element: <ReceivedOffersPage />,
    },
    {
        path: "/request_management/my_offers",
        element: <MyOffersPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
