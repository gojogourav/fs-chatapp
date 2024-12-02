import * as z from 'zod'

export const ThreadValidation = z.object({
    
    thread:z.string().min(3).max(300),
    userId:z.string(),
    
})

export const PostValidation = z.object({

    
        text:z.string(),
        author:z.string(),
        communityId:z.string(),
        path:z.string(),
        parentId:z.string(),
    
})
export const CommentValidation = z.object({
    thread:z.string().nonempty().min(3).max(300),
})