import DarkMode from "~/components/dark-mode/dark-mode";
import Button from "~/components/button/button";
import Drawer from "~/components/drawer/drawer";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Image from "~/media/logo.png?jsx";
import { cn } from "~/common/utils";

const HamburgerIcon = component$(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 bg-transparent"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
});

const MobileMenu = component$(() => {
  return (
    <Drawer>
      <HamburgerIcon q:slot="trigger" />

      <div q:slot="header">
        <div class="flex gap-3">
          <div class="w-14 h-14">
            <Image />
          </div>
          <div class="flex flex-col justify-center font-bold italic text-xl">
            <p class="">Genesis</p>
            <p class="">Oppurtunities</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
});

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

      <MobileMenu />

      <div class="flex gap-5 items-center max-sm:hidden">
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
