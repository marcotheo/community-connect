import {
  $,
  component$,
  HTMLAttributes,
  Slot,
  useSignal,
} from "@builder.io/qwik";
import Button from "../button/button";
import { cn } from "~/common/utils";

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {}

export default component$<DrawerProps>(({ ...props }) => {
  const open = useSignal(false);
  const menuRef = useSignal<HTMLDivElement>();

  const onToggle = $(() => {
    open.value = !open.value;
  });

  return (
    <>
      <Button class="sm:hidden px-2" variant="ghost" onClick$={onToggle}>
        <Slot name="trigger" />
      </Button>

      <div
        {...props}
        ref={menuRef}
        class={cn(
          "absolute z-[1111] bg-surface",
          "top-0 bottom-0 left-0",
          "sm:hidden overflow-hidden",
          "duration-300 ease-out",
          open.value ? "w-72" : "w-0",
        )}
      >
        <div class="p-5 bg-background">
          <Slot name="header" />
        </div>

        <div class="p-5">
          <Slot />
        </div>
        <Button
          onClick$={onToggle}
          variant="ghost"
          class={cn(
            "bg-transparent text-white hover:text-primary",
            "absolute top-0 right-0",
          )}
        >
          X
        </Button>
      </div>

      <div
        onClick$={onToggle}
        class={cn(
          "fixed inset-0 w-full top-0 left-0",
          open.value ? "bg-[rgba(0,0,0,0.5)] z-50" : "bg-transparent z-[-10]",
        )}
      ></div>
    </>
  );
});
