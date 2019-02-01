import React from "react";
import createReactClass from "create-react-class";
import Downshift from "downshift";
import keycode from "keycode";
import PickerInput from "./PickerInput";
import PickerDropdown from "./PickerDropdown";
import PickerChip from "./PickerChip";
import { any, func, array, bool } from "prop-types";

function getLast(sourceArray) {
    if (sourceArray.length) {
        return sourceArray[sourceArray.length - 1];
    }
}

const Picker = createReactClass({
    propTypes: {
        value: array.isRequired,
        onChange: func.isRequired,
        getSuggestedItems: func.isRequired,
        fullWidth: bool,
        highlightedItem: any,
        onHighlightedChange: func.isRequired,
        itemToString: func.isRequired
    },
    getInitialState() {
        return { inputValue: "" };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({ inputValue: inputChangeEvent.target.value });
    },
    handleKeyDown(keyDownEvent) {
        const { inputValue } = this.state;
        if (!inputValue.length && keycode(keyDownEvent) === "backspace") {
            const { value } = this.props;
            const lastItem = getLast(value);
            if (lastItem) {
                this.handleDeleteItem(lastItem);
            }
        }
    },
    handleAddItem(itemToAdd) {
        const { value, onChange, onHighlightedChange } = this.props;
        onChange([...value, itemToAdd]);
        onHighlightedChange(itemToAdd);
        this.setState({ inputValue: "" });
    },
    handleDeleteItem(itemToDelete) {
        const { value, onChange, highlightedItem, onHighlightedChange } = this.props;
        onChange(value.filter(item => item !== itemToDelete));
        if ( itemToDelete === highlightedItem ) {
            onHighlightedChange(undefined);
        }
    },
    getInputAdornments() {
        const { value, onHighlightedChange, highlightedItem, itemToString } = this.props;
        return value.map(item =>
            (
                <PickerChip
                    key={ itemToString(item) }
                    item={ item }
                    label={ itemToString(item) }
                    onDelete={ () => this.handleDeleteItem(item) }
                    onClick={ () => onHighlightedChange(item) }
                    isHighlighted={ item === highlightedItem }
                />
            )
        );
    },
    render() {
        const { inputValue } = this.state;
        const { fullWidth, getSuggestedItems, itemToString, value } = this.props;
        return (
            <Downshift
                inputValue={ inputValue }
                onChange={ this.handleAddItem }
                itemToString={ itemToString }
            >
                {
                    ({ getInputProps, ...dropdownProps }) => (
                        <div>
                            <PickerInput
                                {
                                ...getInputProps({
                                    startAdornment: this.getInputAdornments(),
                                    onChange: this.handleInputChange,
                                    onKeyDown: this.handleKeyDown
                                })
                                }
                                fullWidth={ fullWidth }
                            />
                            <PickerDropdown selectedItems={ value } getSuggestedItems={ getSuggestedItems } {...dropdownProps} />
                        </div>
                    )
                }
            </Downshift>
        );
    }
});

export default Picker;
