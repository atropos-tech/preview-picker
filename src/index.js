import React from "react";
import { func, array, any } from "prop-types";
import createReactClass from "create-react-class";
import Picker from "./Picker";
import PreviewSection from "./PreviewSection";

const PreviewPicker = createReactClass({
    propTypes: {
        value: array.isRequired,
        PreviewComponent: any.isRequired,
        onChange: func.isRequired,
        getSuggestedItems: func.isRequired,
        itemToString: func.isRequired
    },
    getInitialState() {
        return { highlightedItem: undefined };
    },
    handleHighlightedChange(highlightedItem) {
        this.setState({ highlightedItem });
    },
    handleClearHighlight() {
        this.setState({ highlightedItem: false });
    },
    render() {
        const { value, PreviewComponent, onChange, getSuggestedItems, itemToString } = this.props;
        const { highlightedItem, isLoading } = this.state;
        return (
            <div>
                <Picker
                    fullWidth
                    value={ value }
                    onChange={ onChange }
                    highlightedItem={ highlightedItem }
                    onHighlightedChange={ this.handleHighlightedChange }
                    getSuggestedItems={ getSuggestedItems }
                    itemToString={ itemToString }
                />
                {
                    highlightedItem && (
                        <div style={ { padding: "8px 0", paddingLeft: "24px" } } >
                            <PreviewSection
                                item={ highlightedItem }
                                isLoading={ isLoading }
                                onClose={ this.handleClearHighlight }
                                PreviewComponent={ PreviewComponent }
                                itemToString={ itemToString }
                            />
                        </div>
                    )
                }
            </div>
        );
    }
});

export default PreviewPicker;
