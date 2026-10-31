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
