import type { ReactElement, ReactNode } from 'react';
import { StorybookDisplayItem } from './StorybookDisplayItem';
import { StorybookDisplayItems } from './StorybookDisplayItems';

interface StorybookDisplayProps {
    readonly children: ReactNode;
}

export function StorybookDisplay({ children }: StorybookDisplayProps): ReactElement {
    return (
        <main
            style={{
                columnGap: '4rem',
                display: 'grid',
                rowGap: '4rem',
            }}
        >
            {children}
        </main>
    );
}

StorybookDisplay.Item = StorybookDisplayItem;
StorybookDisplay.Items = StorybookDisplayItems;
