import {Post} from "./Post.ts";
import {validator} from "https://deno.land/x/hono@v3.11.8/mod.ts";
export const addPostValidator = validator("json",(value,c)=>{
    const body = value as Post;
    if(!body.title)
        return c.json({message: "error"},400)
    return {body:body}
});