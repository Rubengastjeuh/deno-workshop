import {Hono} from "https://deno.land/x/hono@v3.11.8/mod.ts";
import {addPostValidator} from "./PostValidator.ts";
import {Post} from "./Post.ts";
const PostController = new Hono({strict:false});

const kv = await Deno.openKv();
PostController.get("/:id",async (c)=>{
    const {id} = c.req.param();
    const record = await kv.get(["posts",Number.parseInt(id)]);
    const post: Post = record.value as Post;
    if(!post)
        return c.json({message: "not found"},404)
    return c.json(post)
})
PostController.post("/",addPostValidator,async (c)=>{
    const {body} = c.req.valid("json");
    const post = {id:Date.now(),...body}
    await kv.set(["posts",post.id],post)

    return c.json({message:"Post succesfully created",post: post})
})
export default PostController;