import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import Root from "./__root";
import Chats from "../components/Chats";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import App from "../App";

// Define the root route
const rootRoute = createRootRoute({
  component: Root,
});

const appRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: App,
  });

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chats",
  component: Chats,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

rootRoute.children = [appRoute, chatRoute, profileRoute, loginRoute, registerRoute];

// Initialize and export the router
export const routes = new Router({
    routeTree: rootRoute,
  });

export default routes;
