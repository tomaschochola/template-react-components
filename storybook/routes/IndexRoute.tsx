import type { ReactElement } from 'react';
import { useSeo } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function IndexRoute(): ReactElement {
    const trans = useTrans();

    useSeo({
        title: trans.format('routes.index.seo.title'),
        description: trans.format('routes.index.seo.description'),
    });

    return (
        <main>
            <h1>{trans.format('routes.index.h1')}</h1>
        </main>
    );
}
