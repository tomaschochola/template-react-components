import type { ReactElement } from 'react';
import { ButtonComponent } from '../../src';
import { StorybookDisplay } from '../components/StorybookDisplay';

export function ButtonsRoute(): ReactElement {
    return (
        <StorybookDisplay>
            <StorybookDisplay.Items label="Primary Button">
                <ButtonComponent label="Label" />
            </StorybookDisplay.Items>
        </StorybookDisplay>
    );
}
