import DarkMode from "~/components/dark-mode/dark-mode";
import Button from "~/components/button/button";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Image from "~/media/logo.png?jsx";
import { cn } from "~/common/utils";

export default component$(() => {
  return (
    <div class={cn("flex justify-between items-center", "w-full py-5")}>
      <div class="flex gap-3">
        <div class="w-14 h-14">
          <Image />
        </div>
        <div class="flex flex-col justify-center font-bold italic text-xl">
          <p class="">Genesis</p>
          <p class="">Oppurtunities</p>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <Link href="/sign-in">
          {" "}
          <Button variant="outline" size="md">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="md">Sign Up</Button>
        </Link>
        <DarkMode />
      </div>
    </div>
  );
});
