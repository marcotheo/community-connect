import {
  component$,
  Slot,
  HTMLAttributes,
  createContextId,
  Signal,
  useSignal,
  useContextProvider,
  useContext,
  $,
  useOnDocument,
} from "@builder.io/qwik";
import Button, { ButtonProps } from "../button/button";
import { cn } from "~/common/utils";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  size?: "lg" | "md" | "sm";
}

export const DialogContext = createContextId<Signal<boolean>>(
  "dialog.open-context",
);

export default component$<DialogProps>(({ size = "lg", ...props }) => {
  const open = useSignal<boolean | null>(null);
  const dialogRef = useSignal<HTMLDialogElement>();

  useContextProvider(DialogContext, open);

  const sizes = {
    lg: "md:min-w-[40rem]",
    md: "md:min-w-[30rem]",
    sm: "md:min-w-[25rem]",
  };

  useOnDocument(
    "click",
    $((event: any) => {
      if (
        open.value &&
        dialogRef.value &&
        !dialogRef.value.contains(event.target as Node)
      ) {
        open.value = false;
      }
    }),
  );

  return (
    <>
      <Slot name="trigger" />

      <div
        class={cn(
          "absolute inset-0",
          open.value ? "bg-[rgba(0,0,0,0.8)] z-40" : "bg-transparent z-[-10]",
        )}
      ></div>

      <dialog
        {...props}
        ref={dialogRef}
        open
        class={cn(
          props.class,
          "w-[90%] p-5 top-[50%]",
          "bg-surface rounded-md shadow-lg",
          sizes[size],
          open.value === null
            ? "hidden"
            : open.value
              ? "animate-fade-in-scale z-50"
              : "animate-fade-out-scale",
        )}
      >
        <Slot />
      </dialog>
    </>
  );
});

export const DialogTrigger = component$<ButtonProps>(({ ...props }) => {
  const dialogCtx = useContext(DialogContext);

  const onTrigger = $(() => {
    if (dialogCtx.value === null) dialogCtx.value = true;
    else dialogCtx.value = !dialogCtx.value;
  });

  return (
    <Button {...props} onClick$={onTrigger}>
      <Slot />
    </Button>
  );
});
