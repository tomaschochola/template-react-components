import type { ReactElement } from 'react';
import { ButtonComponent } from '../../src';
import { StorybookDisplay } from '../components/StorybookDisplay';
import { useSeo } from '../lang/seo';
import { useTrans } from '../lang/trans';

export function ButtonsRoute(): ReactElement {
    const trans = useTrans();
    const title = trans.format('Buttons');

    useSeo({ canonical: new URL('buttons', process.env.APP_URL).href, title, description: title, keywords: trans.format('routes.buttons.seo.keywords') });

    return (
        <StorybookDisplay>
            <StorybookDisplay.Items label="Primary Button">
                <ButtonComponent label="Label" />
            </StorybookDisplay.Items>
        </StorybookDisplay>
    );
}
