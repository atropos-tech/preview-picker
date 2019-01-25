import React from 'react';
import { render } from 'react-dom';
import PreviewPicker from './index';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
    }
});

function Sandbox() {
    return (
        <MuiThemeProvider theme={ sandboxTheme }>
            <section>
                <h2>Preview Picker</h2>
                <PreviewPicker />
            </section>
        </MuiThemeProvider>
    );
}

render(<Sandbox />, document.getElementById('sandbox'));