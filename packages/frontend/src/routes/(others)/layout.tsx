import { component$, Slot } from "@builder.io/qwik";
import Header from "./Header";

export default component$(() => {
  return (
    <div>
      <div class="px-5 sm:px-12 2xl:px-72">
        <Header />
      </div>
      <div class="max-h-screen overflow-auto">
        <div class="px-5 sm:px-12 2xl:px-72">
          <Slot />
        </div>
      </div>
    </div>
  );
});
