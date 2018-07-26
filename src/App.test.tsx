import * as React    from 'react';
import App           from './App';


describe('<App />', () => {
    it('should render without throwing an error', () => {
        expect(<App />).toHaveLength(1);
    });

});
