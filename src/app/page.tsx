'use client';

import TopicCreateForm from "@/components/topics/TopicCreateForm";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3 p-4">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div className="col-span-1 p-4">
        <TopicCreateForm />
      </div>
    </div>
  );
}
