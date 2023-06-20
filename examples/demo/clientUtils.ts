import { createClient } from "@tsdl/client";
import type { Router } from "./server";

export const client = createClient<Router>(() => fetch("/tsdl").then(d => d.json()));

