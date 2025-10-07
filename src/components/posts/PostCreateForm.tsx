'use client';

import { startTransition, useActionState } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { createPost } from "@/actions";
import FormButton from "@/components/common/FormButton";
import { errorMessageFormatter } from "@/utils/textFormatting";

export default function PostCreateForm() {
  const [formState, action, isPending] = useActionState(createPost, {
    errors: {}
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              type="text"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              required
              isInvalid={!!formState.errors.title}
              errorMessage={errorMessageFormatter(formState.errors.title)}
            />
            <Textarea
              name="content"
              type="text"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              required
              isInvalid={!!formState.errors.content}
              errorMessage={errorMessageFormatter(formState.errors.content)}
            />
            {formState.errors._form ? <div className="text-sm text-red-600">{errorMessageFormatter(formState.errors._form)}</div> : null}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}