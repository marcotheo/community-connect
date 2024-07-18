import { component$, InputHTMLAttributes } from "@builder.io/qwik";
import { cn } from "~/common/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "underline" | "default";
  errorMsg?: string;
  label: string;
}

export default component$<InputProps>(
  ({ variant = "default", label, errorMsg, ...props }) => {
    const inputVariants = {
      underline: cn("bg-transparent border-b-[2px] border-input"),
      default: cn(
        "bg-transparent rounded-sm px-[10px]",
        "border-[1px] hover:border-primary",
        "focus:border-primary focus-visible:border-transparent",
        "focus-visible:ring-2 focus-visible:ring-primary",
      ),
    };

    const labelVariants = {
      underline: "",
      default: "ml-[10px]",
    };

    return (
      <div class="pt-3">
        <div class="relative w-fit">
          <input
            {...props}
            placeholder=""
            class={cn(
              "peer z-[10] py-2",
              "font-primary",
              "outline-none duration-100 ease-out",
              !!errorMsg ? "border-destructive" : "border-input",
              inputVariants[variant],
              props.class,
            )}
          />
          <div
            class={cn(
              "absolute bottom-0",
              "w-full h-[2px]",
              "duration-300",
              !!errorMsg ? "scale-1 bg-destructive" : "scale-0 bg-primary",
              variant === "underline" ? "peer-focus:scale-100" : "hidden",
            )}
          />
          <p
            class={cn(
              "absolute top-[8px] px-1",
              "text-input text-[0.7em] pointer-events-none",
              "duration-100 ease-out",
              "translate-x-[-3px] translate-y-[-17px]",
              "peer-placeholder-shown:text-[1em]", // default state
              "peer-placeholder-shown:translate-x-[0] peer-placeholder-shown:translate-y-[0]", // default state
              "peer-focus:translate-x-[-3px] peer-focus:translate-y-[-17px]",
              "peer-focus:z-[10] peer-focus:text-[0.7em]",
              labelVariants[variant],
            )}
          >
            {label}
          </p>
        </div>
        <p class="text-destructive text-xs">{errorMsg}</p>
      </div>
    );
  },
);
