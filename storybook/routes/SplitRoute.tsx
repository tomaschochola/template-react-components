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

import { useRef, type ReactElement } from 'react';
import { useLink } from 'react-aria';
import { Outlet } from 'react-router';
import { useTrans } from '../lang/trans';

function Nav(): ReactElement {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const { linkProps } = useLink({ href: '/buttons' }, linkRef);

    const trans = useTrans();

    return (
        <nav>
            <div>
                <a
                    ref={linkRef}
                    {...linkProps}
                >
                    {trans.format('Buttons')}
                </a>
            </div>
        </nav>
    );
}

export function SplitRoute(): ReactElement {
    return (
        <div
            style={{
                paddingBottom: 24,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 24,
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'max-content 1fr',
                }}
            >
                <Nav />
                <Outlet />
            </div>
        </div>
    );
}
