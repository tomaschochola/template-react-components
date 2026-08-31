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

import type { ReactElement, ReactNode } from 'react';

interface StorybookDisplayItemsProps {
    readonly children: ReactNode;
    readonly label?: ReactNode;
}

export function StorybookDisplayItems({ children, label }: StorybookDisplayItemsProps): ReactElement {
    return (
        <div>
            {label !== undefined ? (
                <div
                    style={{
                        marginBottom: '0.5lh',
                        textAlign: 'center',
                    }}
                >
                    {label}
                </div>
            ) : null}
            <div
                style={{
                    backgroundImage: `radial-gradient(circle, rgb(0 0 100 / 0.2) 1px, transparent 1px), radial-gradient(circle, rgb(0 0 100 / 0.2) 1px, transparent 1px)`,
                    backgroundPositionX: '0px, 5px',
                    backgroundPositionY: '0px, 5px',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '10px 10px',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    columnGap: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingBottom: '4rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingTop: '4rem',
                    rowGap: '2rem',
                }}
            >
                {children}
            </div>
        </div>
    );
}
