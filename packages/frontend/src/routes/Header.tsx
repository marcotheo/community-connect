import DarkMode from "~/components/dark-mode/dark-mode";
import Button from "~/components/button/button";
import { component$ } from "@builder.io/qwik";
import Image from "~/media/logo.png?jsx";
import { cn } from "~/common/utils";

export default component$(() => {
  return (
    <div class={cn("flex justify-between items-center", "w-full py-5")}>
      <div class="w-14 h-14">
        <Image />
      </div>
      <div class="flex gap-5 items-center">
        <Button variant="outline" size="md">
          Sign In
        </Button>
        <Button size="md">Sign Up</Button>
        <DarkMode />
      </div>
    </div>
  );
});
