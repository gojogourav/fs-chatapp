import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo:z.string().url().nonempty(),
    name:z.string().min(3).max(30),
    username:z.string().trim().min(3).max(10).trim(),
    bio:z.string().trim().min(3).max(1000),
})