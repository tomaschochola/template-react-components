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
