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

import { test } from '@playwright/test';
import { assertStandardPage } from '@tomaschochola/tooling-playwright';
import { en } from '../../storybook/lang/en';

test('renders the home page', async ({ page }) => {
    await assertStandardPage(page, {
        heading: en['routes.index.h1'],
        title: en['routes.index.seo.title'],
        url: '/',
    });
});
