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
.visible {
    visibility: visible;
  }
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
.absolute {
    position: absolute;
  }
.fixed {
    position: fixed;
  }
.relative {
    position: relative;
  }
.static {
    position: static;
  }
.sticky {
    position: sticky;
  }
.inset-0 {
    inset: calc(var(--spacing, 0.25rem) * 0);
  }
.inset-y-0 {
    inset-block: calc(var(--spacing, 0.25rem) * 0);
  }
.top-0 {
    top: calc(var(--spacing, 0.25rem) * 0);
  }
.top-2 {
    top: calc(var(--spacing, 0.25rem) * 2);
  }
.top-3 {
    top: calc(var(--spacing, 0.25rem) * 3);
  }
.top-5 {
    top: calc(var(--spacing, 0.25rem) * 5);
  }
.right-0 {
    right: calc(var(--spacing, 0.25rem) * 0);
  }
.right-3 {
    right: calc(var(--spacing, 0.25rem) * 3);
  }
.bottom-2 {
    bottom: calc(var(--spacing, 0.25rem) * 2);
  }
.bottom-3 {
    bottom: calc(var(--spacing, 0.25rem) * 3);
  }
.bottom-8 {
    bottom: calc(var(--spacing, 0.25rem) * 8);
  }
.left-0 {
    left: calc(var(--spacing, 0.25rem) * 0);
  }
.left-1 {
    left: calc(var(--spacing, 0.25rem) * 1);
  }
.z-1 {
    z-index: 1;
  }
.z-10 {
    z-index: 10;
  }
.z-50 {
    z-index: 50;
  }
.container {
    width: 100%;
    @media (width >= 20rem) {
      max-width: 20rem;
    }
.m-0 {
    margin: calc(var(--spacing, 0.25rem) * 0);
  }
.m-auto {
    margin: auto;
  }
.mx-0 {
    margin-inline: calc(var(--spacing, 0.25rem) * 0);
  }
.mx-14 {
    margin-inline: calc(var(--spacing, 0.25rem) * 14);
  }
.mx-auto {
    margin-inline: auto;
  }
.my-0 {
    margin-block: calc(var(--spacing, 0.25rem) * 0);
  }
.my-2 {
    margin-block: calc(var(--spacing, 0.25rem) * 2);
  }
.my-5 {
    margin-block: calc(var(--spacing, 0.25rem) * 5);
  }
.my-8 {
    margin-block: calc(var(--spacing, 0.25rem) * 8);
  }
.my-10 {
    margin-block: calc(var(--spacing, 0.25rem) * 10);
  }
.my-20 {
    margin-block: calc(var(--spacing, 0.25rem) * 20);
  }
.my-40 {
    margin-block: calc(var(--spacing, 0.25rem) * 40);
  }
.ms-2 {
    margin-inline-start: calc(var(--spacing, 0.25rem) * 2);
  }
.mt-0 {
    margin-top: calc(var(--spacing, 0.25rem) * 0);
  }
.mt-1 {
    margin-top: calc(var(--spacing, 0.25rem) * 1);
  }
.mt-2 {
    margin-top: calc(var(--spacing, 0.25rem) * 2);
  }
.mt-3 {
    margin-top: calc(var(--spacing, 0.25rem) * 3);
  }
.mt-4 {
    margin-top: calc(var(--spacing, 0.25rem) * 4);
  }
.mt-5 {
    margin-top: calc(var(--spacing, 0.25rem) * 5);
  }
.mt-6 {
    margin-top: calc(var(--spacing, 0.25rem) * 6);
  }
.mt-7 {
    margin-top: calc(var(--spacing, 0.25rem) * 7);
  }
.mt-10 {
    margin-top: calc(var(--spacing, 0.25rem) * 10);
  }
.mr-0 {
    margin-right: calc(var(--spacing, 0.25rem) * 0);
  }
.mr-auto {
    margin-right: auto;
  }
.mb-2 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 2);
  }
.mb-3 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 3);
  }
.mb-4 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 4);
  }
.mb-7 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 7);
  }
.mb-8 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 8);
  }
.mb-10 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 10);
  }
.mb-12 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 12);
  }
.mb-36 {
    margin-bottom: calc(var(--spacing, 0.25rem) * 36);
  }
.ml-0 {
    margin-left: calc(var(--spacing, 0.25rem) * 0);
  }
.ml-2 {
    margin-left: calc(var(--spacing, 0.25rem) * 2);
  }
.ml-3 {
    margin-left: calc(var(--spacing, 0.25rem) * 3);
  }
.ml-auto {
    margin-left: auto;
  }
.block {
    display: block;
  }
.contents {
    display: contents;
  }
.flex {
    display: flex;
  }
.grid {
    display: grid;
  }
.hidden {
    display: none;
  }
.inline-block {
    display: inline-block;
  }
.inline-flex {
    display: inline-flex;
  }
.table {
    display: table;
  }
.size-5 {
    width: calc(var(--spacing, 0.25rem) * 5);
    height: calc(var(--spacing, 0.25rem) * 5);
  }
.size-32 {
    width: calc(var(--spacing, 0.25rem) * 32);
    height: calc(var(--spacing, 0.25rem) * 32);
  }
.h-3 {
    height: calc(var(--spacing, 0.25rem) * 3);
  }
.h-6 {
    height: calc(var(--spacing, 0.25rem) * 6);
  }
.h-8 {
    height: calc(var(--spacing, 0.25rem) * 8);
  }
.h-10 {
    height: calc(var(--spacing, 0.25rem) * 10);
  }
.h-12 {
    height: calc(var(--spacing, 0.25rem) * 12);
  }
.h-24 {
    height: calc(var(--spacing, 0.25rem) * 24);
  }
.h-32 {
    height: calc(var(--spacing, 0.25rem) * 32);
  }
.h-40 {
    height: calc(var(--spacing, 0.25rem) * 40);
  }
.h-100 {
    height: calc(var(--spacing, 0.25rem) * 100);
  }
.h-auto {
    height: auto;
  }
.h-full {
    height: 100%;
  }
.h-px {
    height: 1px;
  }
.h-screen {
    height: 100vh;
  }
.min-h-10 {
    min-height: calc(var(--spacing, 0.25rem) * 10);
  }
.min-h-48 {
    min-height: calc(var(--spacing, 0.25rem) * 48);
  }
.min-h-fit {
    min-height: fit-content;
  }
.min-h-screen {
    min-height: 100vh;
  }
.w-1 {
    width: calc(var(--spacing, 0.25rem) * 1);
  }
.w-2 {
    width: calc(var(--spacing, 0.25rem) * 2);
  }
.w-3 {
    width: calc(var(--spacing, 0.25rem) * 3);
  }
.w-4 {
    width: calc(var(--spacing, 0.25rem) * 4);
  }
.w-6 {
    width: calc(var(--spacing, 0.25rem) * 6);
  }
.w-11 {
    width: calc(var(--spacing, 0.25rem) * 11);
  }
.w-24 {
    width: calc(var(--spacing, 0.25rem) * 24);
  }
.w-38 {
    width: calc(var(--spacing, 0.25rem) * 38);
  }
.w-48 {
    width: calc(var(--spacing, 0.25rem) * 48);
  }
.w-fit {
    width: fit-content;
  }
.w-full {
    width: 100%;
  }
.max-w-2xl {
    max-width: var(--container-2xl, 42rem);
  }
.max-w-5xl {
    max-width: var(--container-5xl, 64rem);
  }
.max-w-6xl {
    max-width: var(--container-6xl, 72rem);
  }
.max-w-48 {
    max-width: calc(var(--spacing, 0.25rem) * 48);
  }
.max-w-64 {
    max-width: calc(var(--spacing, 0.25rem) * 64);
  }
.max-w-full {
    max-width: 100%;
  }
.max-w-none {
    max-width: none;
  }
.max-w-sm {
    max-width: var(--container-sm, 24rem);
  }
.max-w-xs {
    max-width: var(--container-xs, 20rem);
  }
.min-w-36 {
    min-width: calc(var(--spacing, 0.25rem) * 36);
  }
.flex-1 {
    flex: 1;
  }
.flex-shrink {
    flex-shrink: 1;
  }
.flex-grow {
    flex-grow: 1;
  }
.grow {
    flex-grow: 1;
  }
.border-collapse {
    border-collapse: collapse;
  }
.scale-125 {
    --tw-scale-x: 125%;
    --tw-scale-y: 125%;
    --tw-scale-z: 125%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
.transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
.cursor-pointer {
    cursor: pointer;
  }
.resize {
    resize: both;
  }
.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
.grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
.grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
.grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
.grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
.grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
.flex-col {
    flex-direction: column;
  }
.flex-col-reverse {
    flex-direction: column-reverse;
  }
.flex-nowrap {
    flex-wrap: nowrap;
  }
.flex-wrap {
    flex-wrap: wrap;
  }
.place-content-center {
    place-content: center;
  }
.items-center {
    align-items: center;
  }
.items-start {
    align-items: flex-start;
  }
.items-stretch {
    align-items: stretch;
  }
.justify-between {
    justify-content: space-between;
  }
.justify-center {
    justify-content: center;
  }
.justify-end {
    justify-content: flex-end;
  }
.justify-start {
    justify-content: flex-start;
  }
.gap-0 {
    gap: calc(var(--spacing, 0.25rem) * 0);
  }
.gap-2 {
    gap: calc(var(--spacing, 0.25rem) * 2);
  }
.gap-3 {
    gap: calc(var(--spacing, 0.25rem) * 3);
  }
.gap-4 {
    gap: calc(var(--spacing, 0.25rem) * 4);
  }
.gap-5 {
    gap: calc(var(--spacing, 0.25rem) * 5);
  }
.gap-6 {
    gap: calc(var(--spacing, 0.25rem) * 6);
  }
.gap-7 {
    gap: calc(var(--spacing, 0.25rem) * 7);
  }
.gap-8 {
    gap: calc(var(--spacing, 0.25rem) * 8);
  }
.gap-10 {
    gap: calc(var(--spacing, 0.25rem) * 10);
  }
.gap-20 {
    gap: calc(var(--spacing, 0.25rem) * 20);
  }
.gap-24 {
    gap: calc(var(--spacing, 0.25rem) * 24);
  }
.self-end {
    align-self: flex-end;
  }
.overflow-hidden {
    overflow: hidden;
  }
.rounded {
    border-radius: 0.25rem;
  }
.rounded-full {
    border-radius: calc(infinity * 1px);
  }
.rounded-lg {
    border-radius: var(--radius-lg, 0.5rem);
  }
.rounded-md {
    border-radius: var(--radius-md, 0.375rem);
  }
.rounded-none {
    border-radius: 0;
  }
.rounded-xl {
    border-radius: var(--radius-xl, 0.75rem);
  }
.rounded-t-lg {
    border-top-left-radius: var(--radius-lg, 0.5rem);
    border-top-right-radius: var(--radius-lg, 0.5rem);
  }
.border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
.border-2 {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
.border-l-4 {
    border-left-style: var(--tw-border-style);
    border-left-width: 4px;
  }
.border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
.border-solid {
    --tw-border-style: solid;
    border-style: solid;
  }
.border-gray-200 {
    border-color: var(--color-gray-200, oklch(92.8% 0.006 264.531));
  }
.border-gray-300 {
    border-color: var(--color-gray-300, oklch(87.2% 0.01 258.338));
  }
.border-green-300 {
    border-color: var(--color-green-300, color-mix(in srgb, #3d967a 60%, white 40%));
    @supports (color: color-mix(in lab, red, red)) {
      border-color: var(--color-green-300, color-mix(in srgb, var(--brand-color-4) 60%, white 40%));
    }
.border-red-300 {
    border-color: var(--color-red-300, oklch(80.8% 0.114 19.571));
  }
.border-white {
    border-color: var(--color-white, #fff);
  }
.border-yellow-300 {
    border-color: var(--color-yellow-300, color-mix(in srgb, #faad17 60%, white 40%));
    @supports (color: color-mix(in lab, red, red)) {
      border-color: var(--color-yellow-300, color-mix(in srgb, var(--brand-color-5) 60%, white 40%));
    }
.border-l-gray-200 {
    border-left-color: var(--color-gray-200, oklch(92.8% 0.006 264.531));
  }
.bg-black {
    background-color: var(--color-black, #000);
  }
.bg-blue-500 {
    background-color: var(--color-blue-500, var(--brand-color-3));
  }
.bg-blue-700 {
    background-color: var(--color-blue-700, color-mix(in srgb, #004e70 60%, black 40%));
    @supports (color: color-mix(in lab, red, red)) {
      background-color: var(--color-blue-700, color-mix(in srgb, var(--brand-color-3) 60%, black 40%));
    }
.bg-gray-100 {
    background-color: var(--color-gray-100, oklch(96.7% 0.003 264.542));
  }
.bg-gray-200 {
    background-color: var(--color-gray-200, oklch(92.8% 0.006 264.531));
  }
.bg-gray-500 {
    background-color: var(--color-gray-500, oklch(55.1% 0.027 264.364));
  }
.bg-green-100 {
    background-color: var(--color-green-100, color-mix(in srgb, #3d967a 20%, white 80%));
    @supports (color: color-mix(in lab, red, red)) {
      background-color: var(--color-green-100, color-mix(in srgb, var(--brand-color-4) 20%, white 80%));
    }
.bg-green-500 {
    background-color: var(--color-green-500, var(--brand-color-4));
  }
.bg-primary {
    background-color: var(--color-primary, var(--brand-color-1));
  }
.bg-red-100 {
    background-color: var(--color-red-100, oklch(93.6% 0.032 17.717));
  }
.bg-red-500 {
    background-color: var(--color-red-500, oklch(63.7% 0.237 25.331));
  }
.bg-secondary {
    background-color: var(--color-secondary, var(--brand-color-2));
  }
.bg-transparent {
    background-color: transparent;
  }
.bg-white {
    background-color: var(--color-white, #fff);
  }
.bg-yellow-100 {
    background-color: var(--color-yellow-100, color-mix(in srgb, #faad17 20%, white 80%));
    @supports (color: color-mix(in lab, red, red)) {
      background-color: var(--color-yellow-100, color-mix(in srgb, var(--brand-color-5) 20%, white 80%));
    }
.bg-gradient-to-r {
    --tw-gradient-position: to right in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
.from-primary-400 {
    --tw-gradient-from: var(--color-primary-400, color-mix(in srgb, #004e70 80%, white 20%));
    @supports (color: color-mix(in lab, red, red)) {
      --tw-gradient-from: var(--color-primary-400, color-mix(in srgb, var(--brand-color-1) 80%, white 20%));
    }
.to-secondary-500 {
    --tw-gradient-to: var(--color-secondary-500, var(--brand-color-2));
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
.mask-repeat {
    mask-repeat: repeat;
  }
.fill-current {
    fill: currentcolor;
  }
.object-contain {
    object-fit: contain;
  }
.object-cover {
    object-fit: cover;
  }
.p-0 {
    padding: calc(var(--spacing, 0.25rem) * 0);
  }
.p-1 {
    padding: calc(var(--spacing, 0.25rem) * 1);
  }
.p-2 {
    padding: calc(var(--spacing, 0.25rem) * 2);
  }
.p-3 {
    padding: calc(var(--spacing, 0.25rem) * 3);
  }
.p-4 {
    padding: calc(var(--spacing, 0.25rem) * 4);
  }
.p-5 {
    padding: calc(var(--spacing, 0.25rem) * 5);
  }
.p-6 {
    padding: calc(var(--spacing, 0.25rem) * 6);
  }
.p-8 {
    padding: calc(var(--spacing, 0.25rem) * 8);
  }
.p-10 {
    padding: calc(var(--spacing, 0.25rem) * 10);
  }
.p-12 {
    padding: calc(var(--spacing, 0.25rem) * 12);
  }
.px-0 {
    padding-inline: calc(var(--spacing, 0.25rem) * 0);
  }
.px-3 {
    padding-inline: calc(var(--spacing, 0.25rem) * 3);
  }
.px-4 {
    padding-inline: calc(var(--spacing, 0.25rem) * 4);
  }
.px-10 {
    padding-inline: calc(var(--spacing, 0.25rem) * 10);
  }
.px-12 {
    padding-inline: calc(var(--spacing, 0.25rem) * 12);
  }
.py-0 {
    padding-block: calc(var(--spacing, 0.25rem) * 0);
  }
.py-1 {
    padding-block: calc(var(--spacing, 0.25rem) * 1);
  }
.py-2 {
    padding-block: calc(var(--spacing, 0.25rem) * 2);
  }
.py-3 {
    padding-block: calc(var(--spacing, 0.25rem) * 3);
  }
.py-5 {
    padding-block: calc(var(--spacing, 0.25rem) * 5);
  }
.py-10 {
    padding-block: calc(var(--spacing, 0.25rem) * 10);
  }
.py-20 {
    padding-block: calc(var(--spacing, 0.25rem) * 20);
  }
.pt-2 {
    padding-top: calc(var(--spacing, 0.25rem) * 2);
  }
.pt-40 {
    padding-top: calc(var(--spacing, 0.25rem) * 40);
  }
.pr-2 {
    padding-right: calc(var(--spacing, 0.25rem) * 2);
  }
.pr-4 {
    padding-right: calc(var(--spacing, 0.25rem) * 4);
  }
.pr-7 {
    padding-right: calc(var(--spacing, 0.25rem) * 7);
  }
.pb-4 {
    padding-bottom: calc(var(--spacing, 0.25rem) * 4);
  }
.pb-20 {
    padding-bottom: calc(var(--spacing, 0.25rem) * 20);
  }
.pl-5 {
    padding-left: calc(var(--spacing, 0.25rem) * 5);
  }
.pl-7 {
    padding-left: calc(var(--spacing, 0.25rem) * 7);
  }
.text-center {
    text-align: center;
  }
.text-left {
    text-align: left;
  }
.font-mono {
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace);
  }
.font-roboto {
    font-family: var(--font-roboto, 'Roboto', 'Helvetica Neue', Arial, sans-serif);
  }
.font-sans {
    font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  }
.font-serif {
    font-family: var(--font-serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif);
  }
.text-2xl {
    font-size: var(--text-2xl, 1.5rem);
    line-height: var(--tw-leading, var(--text-2xl--line-height, calc(2 / 1.5)));
  }
.text-3xl {
    font-size: var(--text-3xl, 1.875rem);
    line-height: var(--tw-leading, var(--text-3xl--line-height, calc(2.25 / 1.875)));
  }
.text-4xl {
    font-size: var(--text-4xl, 2.25rem);
    line-height: var(--tw-leading, var(--text-4xl--line-height, calc(2.5 / 2.25)));
  }
.text-5xl {
    font-size: var(--text-5xl, 3rem);
    line-height: var(--tw-leading, var(--text-5xl--line-height, 1));
  }
.text-base {
    font-size: var(--text-base, 1rem);
    line-height: var(--tw-leading, var(--text-base--line-height, calc(1.5 / 1)));
  }
.text-lg {
    font-size: var(--text-lg, 1.125rem);
    line-height: var(--tw-leading, var(--text-lg--line-height, calc(1.75 / 1.125)));
  }
.text-sm {
    font-size: var(--text-sm, 0.875rem);
    line-height: var(--tw-leading, var(--text-sm--line-height, calc(1.25 / 0.875)));
  }
.text-xl {
    font-size: var(--text-xl, 1.25rem);
    line-height: var(--tw-leading, var(--text-xl--line-height, calc(1.75 / 1.25)));
  }
.text-xs {
    font-size: var(--text-xs, 0.75rem);
    line-height: var(--tw-leading, var(--text-xs--line-height, calc(1 / 0.75)));
  }
.leading-relaxed {
    --tw-leading: var(--leading-relaxed, 1.625);
    line-height: var(--leading-relaxed, 1.625);
  }
.leading-tight {
    --tw-leading: var(--leading-tight, 1.25);
    line-height: var(--leading-tight, 1.25);
  }
.font-bold {
    --tw-font-weight: var(--font-weight-bold, 700);
    font-weight: var(--font-weight-bold, 700);
  }
.font-light {
    --tw-font-weight: var(--font-weight-light, 300);
    font-weight: var(--font-weight-light, 300);
  }
.font-medium {
    --tw-font-weight: var(--font-weight-medium, 500);
    font-weight: var(--font-weight-medium, 500);
  }
.font-normal {
    --tw-font-weight: var(--font-weight-normal, 400);
    font-weight: var(--font-weight-normal, 400);
  }
.font-semibold {
    --tw-font-weight: var(--font-weight-semibold, 600);
    font-weight: var(--font-weight-semibold, 600);
  }
.tracking-tight {
    --tw-tracking: var(--tracking-tight, -0.025em);
    letter-spacing: var(--tracking-tight, -0.025em);
  }
.text-nowrap {
    text-wrap: nowrap;
  }
.text-wrap {
    text-wrap: wrap;
  }
.whitespace-nowrap {
    white-space: nowrap;
  }
.text-black {
    color: var(--color-black, #000);
  }
.text-blue {
    color: var(--color-blue, #004e70);
  }
.text-blue-600 {
    color: var(--color-blue-600, color-mix(in srgb, #004e70 80%, black 20%));
    @supports (color: color-mix(in lab, red, red)) {
      color: var(--color-blue-600, color-mix(in srgb, var(--brand-color-3) 80%, black 20%));
    }
.text-caribe-blue {
    color: var(--color-caribe-blue, #3fbfd1);
  }
.text-caribe-green {
    color: var(--color-caribe-green, #2f9877);
  }
.text-caribe-red {
    color: var(--color-caribe-red, #e1523b);
  }
.text-caribe-yellow {
    color: var(--color-caribe-yellow, #f0a91e);
  }
.text-gray-300 {
    color: var(--color-gray-300, oklch(87.2% 0.01 258.338));
  }
.text-gray-400 {
    color: var(--color-gray-400, oklch(70.7% 0.022 261.325));
  }
.text-gray-500 {
    color: var(--color-gray-500, oklch(55.1% 0.027 264.364));
  }
.text-gray-600 {
    color: var(--color-gray-600, oklch(44.6% 0.03 256.802));
  }
.text-gray-700 {
    color: var(--color-gray-700, oklch(37.3% 0.034 259.733));
  }
.text-gray-800 {
    color: var(--color-gray-800, oklch(27.8% 0.033 256.848));
  }
.text-gray-900 {
    color: var(--color-gray-900, oklch(21% 0.034 264.665));
  }
.text-green {
    color: var(--color-green, #3d967a);
  }
.text-green-800 {
    color: var(--color-green-800, color-mix(in srgb, #3d967a 40%, black 60%));
    @supports (color: color-mix(in lab, red, red)) {
      color: var(--color-green-800, color-mix(in srgb, var(--brand-color-4) 40%, black 60%));
    }
.text-magenta {
    color: var(--color-magenta, #db4569);
  }
.text-pillar-blue {
    color: var(--color-pillar-blue, #0090d6);
  }
.text-pillar-orange {
    color: var(--color-pillar-orange, #ff481e);
  }
.text-pillar-pink {
    color: var(--color-pillar-pink, #ff205b);
  }
.text-pink-300 {
    color: var(--color-pink-300, oklch(82.3% 0.12 346.018));
  }
.text-primary {
    color: var(--color-primary, var(--brand-color-1));
  }
.text-purple {
    color: var(--color-purple, #4522ac);
  }
.text-red-800 {
    color: var(--color-red-800, oklch(44.4% 0.177 26.899));
  }
.text-secondary {
    color: var(--color-secondary, var(--brand-color-2));
  }
.text-white {
    color: var(--color-white, #fff);
  }
.text-yellow {
    color: var(--color-yellow, #faad17);
  }
.text-yellow-800 {
    color: var(--color-yellow-800, color-mix(in srgb, #faad17 40%, black 60%));
    @supports (color: color-mix(in lab, red, red)) {
      color: var(--color-yellow-800, color-mix(in srgb, var(--brand-color-5) 40%, black 60%));
    }
.uppercase {
    text-transform: uppercase;
  }
.italic {
    font-style: italic;
  }
.underline {
    text-decoration-line: underline;
  }
.opacity-0 {
    opacity: 0%;
  }
.opacity-90 {
    opacity: 90%;
  }
.shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
.shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
.shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
.shadow-indigo-500 {
    --tw-shadow-color: oklch(58.5% 0.233 277.117);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, var(--color-indigo-500, oklch(58.5% 0.233 277.117)) var(--tw-shadow-alpha), transparent);
    }
.outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
.outline-transparent {
    outline-color: transparent;
  }
.blur {
    --tw-blur: blur(8px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
.drop-shadow-2xl {
    --tw-drop-shadow-size: drop-shadow(0 25px 25px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)));
    --tw-drop-shadow: drop-shadow(var(--drop-shadow-2xl, 0 25px 25px rgb(0 0 0 / 0.15)));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
.filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
.backdrop-blur-3xl {
    --tw-backdrop-blur: blur(var(--blur-3xl, 64px));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
.backdrop-filter {
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
.transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)));
    transition-duration: var(--tw-duration, var(--default-transition-duration, 150ms));
  }
.transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)));
    transition-duration: var(--tw-duration, var(--default-transition-duration, 150ms));
  }
.transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)));
    transition-duration: var(--tw-duration, var(--default-transition-duration, 150ms));
  }
.transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)));
    transition-duration: var(--tw-duration, var(--default-transition-duration, 150ms));
  }
.duration-150 {
    --tw-duration: 150ms;
    transition-duration: 150ms;
  }
.duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
.duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
.duration-500 {
    --tw-duration: 500ms;
    transition-duration: 500ms;
  }
.ease-in-out {
    --tw-ease: var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1));
    transition-timing-function: var(--ease-in-out, cubic-bezier(0.4, 0, 0.2, 1));
  }
.text-primary {
    color: var(--color-primary);
  }
.text-secondary {
    color: var(--color-secondary);
  }
.text-blue {
    color: var(--color-blue);
  }
.text-green {
    color: var(--color-green);
  }
.text-yellow {
    color: var(--color-yellow);
  }
.text-purple {
    color: var(--color-purple);
  }
.text-magenta {
    color: var(--color-magenta);
  }
.text-pillar-blue {
    color: var(--color-pillar-blue);
  }
.text-pillar-orange {
    color: var(--color-pillar-orange);
  }
.text-pillar-pink {
    color: var(--color-pillar-pink);
  }
.text-caribe-yellow {
    color: var(--color-caribe-yellow);
  }
.text-caribe-blue {
    color: var(--color-caribe-blue);
  }
.text-caribe-green {
    color: var(--color-caribe-green);
  }
.text-caribe-red {
    color: var(--color-caribe-red);
  }
`;
