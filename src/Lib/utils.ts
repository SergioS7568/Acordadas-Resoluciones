import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Usage with template literals. To call the function, do not use parentheses.
 * @param strings -
 * @param values -
 * @returns string
 */
export const removeLineBreaks = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  let result = "";

  for (let i = 0; i < strings.length; i += 1) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }

  // Remove line breaks and extra spaces
  result = result.replace(/\s+/g, " ");

  return result;
};
