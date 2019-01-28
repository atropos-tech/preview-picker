import React from 'react';
import createReactClass from 'create-react-class';
import { render } from 'react-dom';
import PreviewPicker from './index';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Paper, Typography, LinearProgress, Button } from 'material-ui';
import { blue, red } from 'material-ui/colors';

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

function PickedItemSection({ item, isLoading, onClose }) {            
    const rows = isLoading ? [] : Array(item.rows).fill('some row');        
    return (
        <Paper square style={ { maxHeight: '200px', overflowY: 'auto' }}>
            <Typography>Details for { item.value } ({ rows.length } rows)<Button onClick={ onClose }>Close preview</Button></Typography>            
            { 
                isLoading && <LinearProgress />
            }
            {
                rows.map((row, index) => 
                    (
                        <Typography key={ index }>{ row }</Typography>
                    )
                )
            }
        </Paper>
    );
}    

const Sandbox = createReactClass({
    getInitialState() {
        return { selectedItems: [], highlightedItem: undefined };
    },
    handleChangeSelectedItems(selectedItems) {
        this.setState({ selectedItems });
    },
    handleHighlightedChange(highlightedItem) {
        this.setState({ highlightedItem });
        this.startLoad();
    },
    handleClearHighlight() {
        this.setState({ highlightedItem: false });
    },
    startLoad() {
        this.setState({ isLoading: true });
        window.clearTimeout(this.loader);
        this.loader = window.setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1200);
    },
    render() {
        const { selectedItems, highlightedItem, isLoading } = this.state;
        return (
            <MuiThemeProvider theme={ sandboxTheme }>
                <section>
                    <h2>Preview Picker</h2>
                    <div style={ { width: "300px" } }>
                        <PreviewPicker
                            fullWidth
                            value={ selectedItems } 
                            onChange={ this.handleChangeSelectedItems } 
                            highlightedItem={ highlightedItem } 
                            onHighlightedChange={ this.handleHighlightedChange }                        
                        />
                    </div>
                    {
                        highlightedItem && (
                            <div style={ { padding: "8px 0", paddingLeft: "24px" } } >
                                <PickedItemSection 
                                    item={ highlightedItem }
                                    isLoading={ isLoading }
                                    onClose={ this.handleClearHighlight }
                                />
                            </div>
                        )
                    }
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Sandbox />, document.getElementById('sandbox'));