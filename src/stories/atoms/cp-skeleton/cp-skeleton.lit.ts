import { css } from 'lit';
export default css`
:host {
  box-sizing: border-box;
}
:host *,
:host *::before,
:host *::after {
  box-sizing: inherit;
}
[hidden] {
  display: none !important;
}
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties;
.skeleton {
  position: relative;
  margin-bottom: calc(var(--spacing, 0.25rem) * 3);
  overflow: hidden;
  border-radius: var(--radius-2xl, 1rem);
  background-color: var(--color-neutral-200, oklch(92.2% 0 0));
  &::after {
    animation: loading 1.7s infinite;
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    --tw-translate-x: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
    background-color: var(--color-stone-50, oklch(98.5% 0.001 106.423));
    --tw-content: "";
    content: var(--tw-content);
  }
  &.card-title {
    min-width: 100%;
  }
  &.card-location,
  &.card-type,
  &.card-date,
  &.card-header-case {
    min-width: 20%;
  }
}
@keyframes loading {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-content {
  syntax: "*";
  inherits: false;
  initial-value: "";
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-content: "";
    }
  }
}
`;
