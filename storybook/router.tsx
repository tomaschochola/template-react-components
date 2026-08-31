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

import { createBrowserRouter } from 'react-router';
import { RouteErrorBoundary } from './boundaries/RouteErrorBoundary';
import { ButtonsRoute } from './routes/ButtonsRoute';
import { IndexRoute } from './routes/IndexRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { RootRoute } from './routes/RootRoute';
import { SplitRoute } from './routes/SplitRoute';

export function createRouter() {
    return createBrowserRouter([
        {
            element: <RootRoute />,
            errorElement: <RouteErrorBoundary />,
            children: [
                {
                    element: <SplitRoute />,
                    children: [
                        {
                            index: true,
                            element: <IndexRoute />,
                        },
                        {
                            path: 'buttons',
                            element: <ButtonsRoute />,
                        },
                        {
                            path: '*',
                            element: <NotFoundRoute />,
                        },
                    ],
                },
            ],
        },
    ]);
}
