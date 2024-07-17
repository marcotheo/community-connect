import { component$, InputHTMLAttributes } from "@builder.io/qwik";
import { cn } from "~/common/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
  errorMsg?: string;
  label: string;
}

export default component$<InputProps>(
  ({ variant = "default", label, errorMsg, ...props }) => {
    const variants = {
      default: cn(
        "bg-transparent z-[10] px-[10px]",
        "border-[1px] hover:border-primary",
        "focus:border-primary focus-visible:border-transparent",
        "focus-visible:ring-2 focus-visible:ring-primary",
      ),
    };

    return (
      <div class="pt-3">
        <div class="relative w-fit">
          <input
            {...props}
            placeholder=""
            class={cn(
              "py-2 peer",
              "font-primary rounded-sm",
              "outline-none duration-100 ease-out",
              !!errorMsg ? "border-destructive" : "border-input",
              variants[variant],
              props.class,
            )}
          />
          <p
            class={cn(
              "absolute top-[8px] px-1 ml-[10px]",
              "text-input text-[0.7em] pointer-events-none",
              "duration-100 ease-out",
              "translate-x-[-3px] translate-y-[-17px]",
              "peer-placeholder-shown:text-[1em]", // default state
              "peer-placeholder-shown:translate-x-[0] peer-placeholder-shown:translate-y-[0]", // default state
              "peer-focus:translate-x-[-3px] peer-focus:translate-y-[-17px]",
              "peer-focus:z-[10] peer-focus:text-[0.7em]",
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
