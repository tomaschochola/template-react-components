/**
 * @file
 * @author Tomáš Chochola <tomaschochola@tomaschochola.cz>
 * @copyright © 2026 Tomáš Chochola <tomaschochola@tomaschochola.cz>
 *
 * @license CC-BY-ND-4.0
 *
 * @see {@link https://creativecommons.org/licenses/by-nd/4.0/} License
 * @see {@link https://github.com/tomaschochola} GitHub Profile
 * @see {@link https://github.com/sponsors/tomaschochola} GitHub Sponsors
 */

import { useRef, type ReactElement, type ReactNode } from 'react';
import type { AriaButtonOptions } from 'react-aria';
import { useButton } from 'react-aria';

interface ButtonComponentProps extends Omit<AriaButtonOptions<'button'>, 'children'> {
    readonly label: ReactNode;
}

export function ButtonComponent({ label, ...props }: Readonly<ButtonComponentProps>): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, buttonRef);

    return (
        <button
            ref={buttonRef}
            {...buttonProps}
        >
            {label}
        </button>
    );
}
