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
