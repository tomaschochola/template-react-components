import type { ReactElement } from 'react';
import { useSeo } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function IndexRoute(): ReactElement {
    const trans = useTrans();

    useSeo({
        canonical: new URL('./', process.env.APP_URL).href,
        title: trans.format('routes.index.seo.title'),
        description: trans.format('routes.index.seo.description'),
        keywords: trans.format('routes.index.seo.keywords'),
    });

    return (
        <main>
            <h1>{trans.format('routes.index.h1')}</h1>
        </main>
    );
}
