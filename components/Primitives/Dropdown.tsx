import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useContext, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { BsDot } from "react-icons/bs";

// This primitive accepts either an array of {value: string, displayName: string, bubbleValue: string | number}
// Or, just an array of {value: string}
// Doubly-Or, just a string array
// This allows for ones with custom display text, or just simple ones
// TODO: allow this to just accept a single string arr and still work

export function RadioDropdown({
  options,
  value,
  onValueChange,
  triggerClass = "",
  headingText,
  headingClass = "",
  ariaLabel = "",
}: {
  options:
    | {
        value: string;
        displayText?: string;
        bubbleValue?: string | number;
        disabled?: boolean;
      }[]
    | string[];
  value: string;
  onValueChange: (e: string) => void;
  triggerClass?: string;
  headingText?: string;
  headingClass?: string;
  ariaLabel: string;
}) {
  const formattedOptions = useMemo(() => {
    if (typeof options[0] === "string") {
      return options.map((e) => ({
        value: e,
        displayText: e,
        bubbleValue: undefined,
        disabled: false,
      }));
    }
    // God they need to hook typescript up to a brain interface so it can learn THIS IS INTENDED
    // TODO: figure out the typerrors
    return options.map((e) => ({
      // @ts-ignore
      value: e.value,
      // @ts-ignore
      displayText: e?.displayText || e.value,
      // @ts-ignore
      bubbleValue: e?.bubbleValue ?? undefined,
      // @ts-ignore
      disabled: e?.disabled ?? false,
    }));
  }, [options]);

  const { resolvedTheme } = useTheme();

  const selected = useMemo(
    () => formattedOptions.find((e: any) => e.value === value) || formattedOptions[0],
    [formattedOptions, value]
  );

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        aria-label={ariaLabel}
        className="flex w-full select-none flex-col gap-2"
        onPointerUp={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            setOpen(true);
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            e.preventDefault();
          }
        }}
      >
        {headingText && (
          <span className={twMerge("w-full text-left font-bold", headingClass)}>{headingText}</span>
        )}
        <div
          className={twMerge(
            "flex h-12 w-full min-w-[250px] items-center justify-center rounded-xl border-2 border-borders-base1-light bg-base-3-light px-4 transition-all hover:border-borders-base2-light dark:border-borders-base1-dark dark:bg-base-3-dark hover:dark:border-borders-base2-dark",
            triggerClass
          )}
        >
          <div className="flex h-full w-fit flex-1 items-center justify-between text-sm">
            <span>{selected?.displayText || selected?.value}</span>
            {formattedOptions.reduce(
              (prev, cur) => (cur?.bubbleValue || prev ? true : false),
              false
            ) && (
              <span className="flex items-center justify-center rounded-full pr-2">
                {selected?.bubbleValue}
              </span>
            )}
          </div>
          <MdKeyboardArrowDown />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <>
          <div className="radio-dropdown-backdrop pointer-events-none fixed inset-0 bg-app-backdropUmbra-light transition dark:bg-app-backdropUmbra-dark sm:hidden"></div>
          <div className={`${resolvedTheme} contents`}>
            {/* bg-base-3-light dark:bg-base-3-dark w-[250px] text-black dark:text-white rounded-xl border-2 border-borders-base2-light dark:border-borders-base2-dark  */}
            <DropdownMenu.Content
              avoidCollisions
              collisionPadding={16}
              className="font-fancy radio-dropdown z-[9999] my-1 h-max w-[250px] cursor-default select-none overflow-hidden overflow-y-auto rounded-xl bg-base-3-light text-sm text-black transition-all dark:bg-base-3-dark dark:text-white"
            >
              <DropdownMenu.RadioGroup value={value} onValueChange={onValueChange}>
                <div className="radio-dropdown-content-wrapper max-h-[var(--radix-popper-available-height)]">
                  {formattedOptions.map((e) => (
                    <DropdownMenu.RadioItem
                      disabled={e.disabled}
                      value={e.value}
                      key={e.value}
                      className="relative m-1 flex items-center justify-center rounded-lg px-4 py-2 pl-8 outline-none hover:bg-brandBlue focus:bg-brandBlue dark:hover:bg-brandBlue dark:focus:bg-brandBlue"
                    >
                      <DropdownMenu.ItemIndicator className="absolute -left-1 top-1/2 -translate-y-1/2">
                        <BsDot size={36} />
                      </DropdownMenu.ItemIndicator>
                      <div className="flex w-full items-center justify-between gap-2">
                        <span
                          className={twMerge(
                            "flex w-fit items-center font-semibold",
                            e.disabled ? "text-textFadedLight dark:text-textFadedDark" : ""
                          )}
                        >
                          {e.displayText}
                        </span>
                        {e.bubbleValue !== undefined && (
                          <span className="font-semibold ">{e.bubbleValue}</span>
                        )}
                      </div>
                    </DropdownMenu.RadioItem>
                  ))}
                </div>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </div>
        </>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
