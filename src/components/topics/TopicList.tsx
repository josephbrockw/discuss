
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db";
import paths from "@/paths";

export default async function TopicList() {
    const topics = await db.topic.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const renderedTopics = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link key={topic.id} href={paths.topicDetail(topic.slug)} >
                    <Chip
                        color="primary"
                        variant="bordered"
                        className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all cursor-pointer"
                    >
                        {topic.name}
                    </Chip>
                </Link>
            </div>
        )
    });

    return (
        <div className="flex flex-row flex-wrap gap-2 mt-4">
            {renderedTopics}
        </div>
    )
}