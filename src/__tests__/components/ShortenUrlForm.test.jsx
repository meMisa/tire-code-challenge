import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import ShortenUrlForm from 'components/ShortenUrlForm';

afterEach(() => {
    cleanup();
});

describe('Test', () => {
    test('should render ShortenUrlForm component correctly', () => {
        render(<ShortenUrlForm />);
        const ShortenUrlFormComponent = screen.getByTestId('url-label');
        expect(ShortenUrlFormComponent).toBeInTheDocument();
        expect(ShortenUrlFormComponent).toHaveTextContent('Url:');
    });
    test('should have got button submit', () => {
        render(<ShortenUrlForm />);
        const ShortenUrlFormComponent = screen.getByTestId('submit-button');
        expect(ShortenUrlFormComponent).toBeInTheDocument();
        expect(ShortenUrlFormComponent).toHaveTextContent('Shorten and copy URL');
    });
    test('match snapshot', () => {
        const tree = renderer.create(<ShortenUrlForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
