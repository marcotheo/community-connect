import {
  component$,
  Slot,
  HTMLAttributes,
  useSignal,
  useOnDocument,
  $,
  Signal,
} from "@builder.io/qwik";
import Button from "../button/button";
import { cn } from "~/common/utils";

interface DropDownMenuProps extends HTMLAttributes<HTMLMenuElement> {
  title: string;
}

export default component$<DropDownMenuProps>(({ title, ...props }) => {
  const isOpen = useSignal(false);
  const dropdownRef = useSignal<HTMLDivElement>();

  useOnDocument(
    "click",
    $((event: any) => {
      if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
      ) {
        isOpen.value = false;
      }
    }),
  );

  return (
    <menu
      {...props}
      class={cn("font-secondary font-medium", "group", props.class)}
      ref={dropdownRef}
    >
      <DropDownMenuTrigger title={title} isOpen={isOpen} />

      <div
        class={cn(
          "bg-surface",
          "absolute z-50",
          "mt-1 py-1",
          "shadow-md rounded-md",
          "border-[0.5px] border-popup",
          "animate-fade-in-slide duration-100",
          isOpen.value ? "block" : "hidden",
        )}
      >
        <Slot name="label" />
        <div class="flex flex-col overflow-auto max-h-56">
          <Slot />
        </div>
      </div>
    </menu>
  );
});

const ChevronDown = component$<{ isOpen: boolean }>(({ isOpen }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class={cn(
        "size-4 bg-transparent",
        "duration-300 ease-out",
        isOpen ? "rotate-180" : "",
      )}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
});

const DropDownMenuTrigger = component$<{
  title: string;
  isOpen: Signal<boolean>;
}>(({ isOpen, title }) => {
  return (
    <>
      <Button
        class="peer flex gap-3 items-center"
        variant="outline"
        onClick$={() => (isOpen.value = !isOpen.value)}
      >
        {title} <ChevronDown isOpen={isOpen.value} />
      </Button>
    </>
  );
});

export const DropDownMenuLabel = component$(() => {
  return (
    <>
      <div class={cn("p-2 min-w-48")}>
        <p class="font-secondary font-semibold text-xs">
          <Slot />
        </p>
      </div>
      <DropDownSeparator />
      <div class="h-1 w-full" />
    </>
  );
});

export const DropDownMenuItem = component$(() => {
  return (
    <>
      <div class="w-full px-1">
        <div
          class={cn(
            "min-w-48 p-2 rounded-md",
            "cursor-pointer hover:brightness-105 hover:dark:brightness-150",
            "duration-100 ease-out",
          )}
        >
          <p class="font-semibold text-xs">
            <Slot />
          </p>
        </div>
      </div>
    </>
  );
});

export const DropDownSeparator = component$(() => (
  <hr class="h-[0.5px] w-full border-popup z-50" />
));
