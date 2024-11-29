import * as z from 'zod'

export const ThreadValidation = z.object({
    thread:z.string().nonempty().min(3).max(300),
    userId:z.string().nonempty()
})
export const CommentValidation = z.object({
    thread:z.string().nonempty().min(3).max(300),
})