import {Hono} from "https://deno.land/x/hono@v3.11.8/mod.ts";
import postController from "./PostController.ts";

const app = new Hono({strict:false}).basePath("/api")

app.route("/posts",postController);
Deno.serve(app.fetch);