import React from "react";
import { any } from "prop-types";
import createReactClass from "create-react-class";
import { render } from "react-dom";
import PreviewPicker from "./index";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { blue, red } from "material-ui/colors";
import { LinearProgress } from "material-ui";

const ALL_ITEMS = [
    {value: "apple", rows: 15 },
    {value: "pear", rows: 2 },
    {value: "orange", rows: 7 },
    {value: "grape", rows: 20 },
    {value: "banana", rows: 500 },
    {value: "papaya", rows: 230 },
];

const itemToString = item => item.value;

function getSuggestedItems(searchString, selectedItems) {
    return ALL_ITEMS
        .filter(item => item.value.toLowerCase().includes(searchString.toLowerCase()))
        .filter(item => !selectedItems.includes(item));
}

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

const previewCache = {};

const SandboxPreview = createReactClass({
    propTypes: {
        item: any
    },
    componentDidMount() {
        this.loadItem();
    },
    componentDidUpdate() {
        this.loadItem();
    },
    loadItem() {
        const { item } = this.props;
        if ( !previewCache[ item.value ] ) {
            setTimeout(() => {
                previewCache[ item.value ] = Array(item.rows).fill(true).map(() => "some row");
                this.forceUpdate();
            }, 1200);
        }
    },
    render() {
        const { item } = this.props;
        const rows = previewCache[ item.value ];
        if (rows) {
            return (
                <div style={ { maxHeight: "200px", overflowY: "auto" }}>
                    {
                        rows.map((row, index) =>
                            (
                                <div key={ index }>some row</div>
                            )
                        )
                    }
                </div>
            );
        }
        return <LinearProgress />;
    }
});

const Sandbox = createReactClass({
    getInitialState() {
        return { selectedItems: [] };
    },
    handleSelectedItemsChange(selectedItems) {
        this.setState({ selectedItems });
    },
    render() {
        const { selectedItems } = this.state;
        return (
            <MuiThemeProvider theme={ sandboxTheme }>
                <section>
                    <h2>Preview Picker</h2>
                    <div style={ { width: "400px" } }>
                        <PreviewPicker
                            value={ selectedItems }
                            onChange={ this.handleSelectedItemsChange }
                            getSuggestedItems={ getSuggestedItems }
                            itemToString={ itemToString }
                            PreviewComponent={ SandboxPreview }
                        />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Sandbox />, document.getElementById("sandbox"));
