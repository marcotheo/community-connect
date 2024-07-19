import DarkMode from "~/components/dark-mode/dark-mode";
import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div>
      <div>
        <DarkMode />
      </div>
      <div class="max-h-screen overflow-auto">
        <div class="px-5 sm:px-12 2xl:px-72">
          <Slot />
        </div>
      </div>
    </div>
  );
});
