'use server';

import { z } from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";

const TopicCreateFormSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must contain at least 3 characters" })
        .max(50, { message: "Name must be less than 50 characters" })
        .regex(/^[a-zA-Z-]+$/, {
            message: "Name can only contain letters and hyphens"
        }),
    description: z.string().min(10)
});

interface TopicCreateFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    }
}

export async function createTopic(
    formState: TopicCreateFormState, 
    formData: FormData
): Promise<TopicCreateFormState> {
    const result = TopicCreateFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    });

    if (!result.success) {
        console.log(result.error.flatten().fieldErrors);
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must be logged in to create a topic"]
            }
        };
    }

    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                name: result.data.name,
                slug: encodeURIComponent(
                    result.data.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/^-+|-+$/g, "")
                ),
                description: result.data.description,
            }
        })

    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ["An unexpected error occurred. Please try again."]
                }
            }

        }
    }

    revalidatePath(paths.home());
    redirect(paths.topicDetail(topic.slug));

    return {
        errors: {}
    };
}
