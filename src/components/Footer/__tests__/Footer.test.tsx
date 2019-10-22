import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import Footer from '../Footer';

it('renders with correctly footer content', () => {
    const testRenderer = TestRenderer.create(
        <StaticRouter context={{}}>
            <Footer></Footer>
        </StaticRouter>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
});