import React from 'react';
import createReactClass from 'create-react-class';
import Downshift from 'downshift';
import keycode from 'keycode';
import PickerInput from './PickerInput';
import PickerDropdown from './PickerDropdown';
import PickerChip from './PickerChip';

function getLast(array) {
    if (array.length) {
        return array[array.length - 1];
    }
}

const PreviewPicker = createReactClass({
    getInitialState() {
        return { inputValue: "" };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({ inputValue: inputChangeEvent.target.value });
    },
    handleKeyDown(keyDownEvent) {
        const { inputValue } = this.state;        
        if (!inputValue.length && keycode(keyDownEvent) === 'backspace') {
            const { value, highlightedItem } = this.props;
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
        const { value, onHighlightedChange, highlightedItem } = this.props;
        return value.map(item =>
            (
                <PickerChip 
                    key={ item.value }
                    item={ item }
                    onDelete={ () => this.handleDeleteItem(item) }
                    onClick={ () => onHighlightedChange(item) }
                    isHighlighted={ item === highlightedItem }
                />
            )
        );
    },
    render() {
        const { inputValue } = this.state;
        const { fullWidth } = this.props;
        return (
            <Downshift
                inputValue={ inputValue }
                onChange={ this.handleAddItem }
                itemToString={item => (item ? item.value : '')}
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
                            <PickerDropdown {...dropdownProps} />
                        </div>
                    )
                }
            </Downshift>
          );
    }
});

export default PreviewPicker;