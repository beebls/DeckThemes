import { useTheme } from "next-themes";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export function TwoItemToggle({
  value,
  label,
  onValueChange,
  options,
  rootClass = "",
  optionClass = "",
  buttonClass = "",
  highlightClass = "",
}: {
  value: any;
  label?: string;
  optionClass?: string;
  onValueChange: Dispatch<SetStateAction<any>>;
  options: { value: any; displayText: string | ReactNode }[];
  rootClass?: string;
  buttonClass?: string;
  highlightClass?: string;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className={twMerge("flex flex-col items-start gap-1 font-bold", rootClass)}>
        {label && <span className="font-fancy text-sm font-bold">{label}</span>}
        <div
          className={twMerge(
            "font-fancy relative flex h-10 gap-8 rounded-full border-2 border-borders-base1-light bg-base-3-light p-2 px-4 dark:border-borders-base2-dark dark:bg-base-5-dark",
            buttonClass
          )}
        >
          <button
            className={twMerge(
              "relative z-20 flex w-16 items-center justify-center outline-none",
              `${resolvedTheme === "light" && value === options[0].value && "text-white"}`,
              optionClass
            )}
            onClick={() => onValueChange(options[0].value)}
          >
            <span>{options[0].displayText}</span>
          </button>
          <button
            className={twMerge(
              "relative z-20 flex w-16 items-center justify-center outline-none",
              `${resolvedTheme === "light" && value === options[1].value && "text-white"}`,
              optionClass
            )}
            onClick={() => onValueChange(options[1].value)}
          >
            <span>{options[1].displayText}</span>
          </button>
          <div
            className={twMerge(
              `absolute top-0 z-10 m-1 h-[calc(100%-8px)] w-[calc(50%-8px)] rounded-3xl bg-brandBlue transition-all duration-100`,
              highlightClass
            )}
            style={{ left: value === options[0].value ? 0 : "50.2%" }}
          />
        </div>
      </div>
    </>
  );
}
