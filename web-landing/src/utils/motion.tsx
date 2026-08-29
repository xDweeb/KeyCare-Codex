/* eslint-disable react-refresh/only-export-components */
import { createElement, Fragment, type ComponentType, type HTMLAttributes, type ReactNode } from 'react';

type CompatProps = { children?: ReactNode; [key: string]: unknown };

const animationProps = new Set([
  'animate', 'exit', 'initial', 'layout', 'transition', 'variants',
  'whileHover', 'whileInView', 'whileTap', 'viewport',
]);

function element(tag: string): ComponentType<CompatProps> {
  return ({ children, ...props }) => {
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([name]) => !animationProps.has(name)),
    ) as HTMLAttributes<HTMLElement>;
    return createElement(tag, domProps, children);
  };
}

export const motion = new Proxy({} as Record<string, ComponentType<CompatProps>>, {
  get: (_target, tag: string) => element(tag),
});

export function AnimatePresence({ children }: CompatProps) {
  return <Fragment>{children}</Fragment>;
}
