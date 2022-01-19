import React from 'react';
import renderer from 'react-test-renderer';

// Import components
import App from './routes/App';
import Metronome from './components/metronome/metronome';
import Splash from './components/splash/splash';
import Keyboard from './components/keyboard/keyboard';
import Volume from './components/volume/volume';

/* This form of regression testing tests whether 
the DOM for every component remains the same.
If the changes are intentional, the snapshot 
for a changed component must be updated! */

it('checks that the App DOM is consistent', () => {
    const appTree = renderer.create(<App/>).toJSON();
    expect(appTree).toMatchSnapshot();
});

it('checks that the Metronome DOM is consistent', () => {
    const metronomeTree = renderer.create(<Metronome/>).toJSON();
    expect(metronomeTree).toMatchSnapshot();
});

it('checks that the Splash DOM is consistent', () => {
    const splashTree = renderer.create(<Splash/>).toJSON();
    expect(splashTree).toMatchSnapshot();
});

it('checks that the Keyboard DOM is consistent', () => {
    const keyboardTree = renderer.create(<Keyboard/>).toJSON();
    expect(keyboardTree).toMatchSnapshot();
});

it('checks that the Volume DOM is consistent', () => {
    const volumeTree = renderer.create(<Volume/>).toJSON();
    expect(volumeTree).toMatchSnapshot();
});