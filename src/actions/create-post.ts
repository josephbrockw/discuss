'use server';

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

const CreatePostSchema = z.object({
    title: z.string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
    content: z.string()
    .min(2, { message: "Content must be at least 2 characters long" })
    .max(1000, { message: "Content must be at most 1000 characters long" }),
});

interface CreatePostFormState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

export async function createPost(
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const result = CreatePostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            errors: fieldErrors         
        };
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be signed in to create a post"]
            }
        };
    }

    return {
        errors: {}
    };
    // TODO: Revalidate the topic detail page
}
