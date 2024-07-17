import { component$, InputHTMLAttributes } from "@builder.io/qwik";
import { cn } from "~/common/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default";
  label: string;
}

export default component$<InputProps>(
  ({ variant = "default", label, ...props }) => {
    const variants = {
      default: cn(
        "bg-transparent z-[1111] px-[10px]",
        "border-[1px] border-input hover:border-primary",
        "focus:border-primary focus-visible:border-transparent",
        "focus-visible:ring-2 focus-visible:ring-primary",
      ),
    };

    return (
      <div class="pt-2">
        <div class="relative w-fit">
          <input
            {...props}
            class={cn(
              "py-2 peer",
              "font-primary rounded-sm",
              "outline-none duration-100 ease-out",
              variants[variant],
              props.class,
            )}
          />
          <p
            class={cn(
              "absolute top-[8px] px-1",
              "text-[1em] ml-[10px]",
              "duration-100 ease-out",
              "peer-focus:translate-x-[-3px] peer-focus:translate-y-[-17px]",
              "peer-focus:z-[1111] peer-focus:text-[0.7em]",
            )}
          >
            {label}
          </p>
        </div>
      </div>
    );
  },
);
