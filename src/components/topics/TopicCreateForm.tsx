'use client';

import { useActionState, startTransition } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { createTopic } from "@/actions";
import FormButton from "@/components/common/FormButton";
import { errorMessageFormatter } from "@/utils/textFormatting";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(createTopic, {
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
    <Popover placement="left" isDismissable>
      <PopoverTrigger>
        <Button color="primary">
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-bold">Create a new topic</h3>
            <Input
              name="name"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              required
              isInvalid={!!formState.errors.name}
              errorMessage={errorMessageFormatter(formState.errors.name)}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic."
              required
              isInvalid={!!formState.errors.description}
              errorMessage={errorMessageFormatter(formState.errors.description)}
            />
            {formState.errors._form && (
              <div className="text-sm text-red-600">
                {errorMessageFormatter(formState.errors._form)}
              </div>
            )}
            <FormButton isLoading={isPending}>
              Create
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}