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
    topicSlug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const result = CreatePostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    // Handle validation errors
    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            errors: fieldErrors         
        };
    }

    // Ensure the user is authenticated
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ["You must be signed in to create a post"]
            }
        };
    }

    // Retrieve the topic by its slug
    const topic = await db.topic.findUnique({
        where: {
            slug: topicSlug
        }
    });
    if (!topic) {
        return {
            errors: {
                _form: ["The specified topic does not exist"]
            }
        };
    }

    // Create the post
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            }
        }); 
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            };
        }

        return {
            errors: {
                _form: ["Failed to create post"]
            }
        };
    }
    
    // Revalidate the topic page and redirect to the new post
    revalidatePath(paths.topicDetail(topicSlug));
    redirect(paths.postDetail(topicSlug, post.id));
}
