import {
  AlignContentTypes,
  AlignItemsTypes,
  GapTypes,
  JustifyContentTypes,
  LgColTypes,
  MdColTypes,
  RowSpanTypes,
  SmColTypes,
  VerticalAlignTypes,
  XlColTypes,
  XsColTypes,
} from "./gridEnums";

import { cn, removeLineBreaks } from "./utils";

export type GridProps = Record<string, unknown> &
  (
    | {
        container: boolean;
        children?: React.ReactNode;
        gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
        useScreen?: boolean;
        xl?: never;
        lg?: never;
        md?: never;
        sm?: never;
        xs?: never;
        item?: never;
        rowSpan?: never;
      }
    | {
        item: boolean;
        xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        xs: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
        children?: string | React.ReactNode;
        rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
        container?: never;
        gap?: never;
        useScreen?: never;
      }
  ) & {
    className?: string;
    component?:
      | "div"
      | "span"
      | "section"
      | "article"
      | "main"
      | "header"
      | "footer"
      | "form"
      | "ul"
      | "li"
      | JSX.ElementType;
    justifyContent?:
      | "around"
      | "between"
      | "center"
      | "end"
      | "evenly"
      | "normal"
      | "start"
      | "stretch";
    alignContent?:
      | "around"
      | "baseline"
      | "between"
      | "center"
      | "end"
      | "evenly"
      | "normal"
      | "start"
      | "stretch";
    alignItems?: "baseline" | "center" | "end" | "start" | "stretch";
    verticalAlign?:
      | "auto"
      | "baseline"
      | "center"
      | "end"
      | "start"
      | "stretch";
  };

/**
 * A custom Grid component.
 *
 * @param props - The component props.
 * @param alignContent - How rows are positioned in multi-row flex and grid containers.
 * @param className - Additional class names to apply to the icon container.
 * @param component - The component to render.
 * @param container - For fixing an element's width to the current breakpoint.
 * @param gap - Distance between elements.
 * @param item - To control the flexbox behavior of an element.
 * @param justifyContent - How flex and grid items are positioned along a container's main axis.
 * @param md - How elements are sized and placed across grid columns using responsive design.
 * @param lg - How elements are sized and placed across grid columns using responsive design.
 * @param rowSpan - How elements are sized and placed across grid rows.
 * @param sm - How elements are sized and placed across grid columns using responsive design.
 * @param verticalAlign - How an individual flex or grid item is positioned along its container's cross axis.
 * @param xs - How elements are sized and placed across grid columns using responsive design.
 * @param useScreen - For fixing an element's width to the current breakpoint, and not to the Grid container width.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Grid container><Grid item>Some content</Grid></Grid>
 * ```
 */

const Grid = (props: GridProps): JSX.Element => {
  const {
    alignContent = "",
    alignItems = "",
    children,
    className = "",
    component: Component = "div",
    container = false,
    gap = 0,
    item = false,
    justifyContent = "",
    xl,
    lg,
    md,
    rowSpan = 1,
    sm,
    xs,
    verticalAlign = "",
    useScreen = false,
    ...rest
  } = props;

  const classes = (): string => {
    if (container) {
      return cn(
        removeLineBreaks`grid grid-cols-12 ${!useScreen ? "@container" : ""}
      ${gap ? GapTypes[gap] : ""}
      ${alignContent ? AlignContentTypes[alignContent] : ""}
      ${alignItems ? AlignItemsTypes[alignItems] : ""}
      ${justifyContent ? JustifyContentTypes[justifyContent] : ""}
      ${RowSpanTypes[rowSpan]}
      `,
        className
      );
    }

    if (item && xs) {
      return cn(
        removeLineBreaks`${XsColTypes[xs]}
        ${xl ? XlColTypes[xl] : ""}
        ${lg ? LgColTypes[lg] : ""}
        ${md ? MdColTypes[md] : ""}
        ${sm ? SmColTypes[sm] : ""}
        ${verticalAlign ? VerticalAlignTypes[verticalAlign] : ""}
        ${alignContent ? AlignContentTypes[alignContent] : ""}
        ${alignItems ? AlignItemsTypes[alignItems] : ""}
        ${justifyContent ? JustifyContentTypes[justifyContent] : ""}
      `,
        className
      );
    }

    return "";
  };

  return (
    <Component className={classes()} {...rest}>
      {children}
    </Component>
  );
};

export default Grid;
