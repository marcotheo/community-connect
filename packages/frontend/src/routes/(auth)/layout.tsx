import DarkMode from "~/components/dark-mode/dark-mode";
import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-col h-full">
      <div class="flex w-full justify-end p-5">
        <DarkMode />
      </div>
      <div class="grow overflow-auto">
        <div class="px-5 sm:px-12 2xl:px-72">
          <Slot />
        </div>
      </div>
    </div>
  );
});
