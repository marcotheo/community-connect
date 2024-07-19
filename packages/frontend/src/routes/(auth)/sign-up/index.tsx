import { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import Input from "~/components/input/input";
import { cn } from "~/common/utils";

export default component$(() => {
  return (
    <div>
      <div class={cn("flex flex-col gap-5", "w-[500px] h-[200px] border p-5")}>
        <Input label="Email" variant="underline" />
        <Input type="password" label="Password" variant="underline" />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign up - Genesis Oppurtunities",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
