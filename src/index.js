import React from 'react';
import createReactClass from 'create-react-class';
import Downshift from 'downshift';
import keycode from 'keycode';
import { TextField, Paper, MenuItem, Chip } from 'material-ui';

const items = [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
];

function withoutLastItem(array) {
    if ( array.length ) {        
        return array.slice(0, array.length - 1);
    }
    return array;
}

function PickerInput({ value, onChange, startAdornment, ...inputProps }) {            
    const InputProps = {
        inputProps,        
        startAdornment: startAdornment.length ? startAdornment : false //needed to make the label appear correctly
    };    
    return (
        <TextField label="woot" value={ value } onChange={ onChange } InputProps={ InputProps } />
    );
}

function getVisibleItems(items, inputValue) {
    if ( inputValue ) {
        return items.filter(item => item.value.includes(inputValue));
    }
    return items;
}

function PickerDropdown(props) {
    const { isOpen, inputValue, highlightedIndex, selectedItem, getItemProps } = props;
    if ( isOpen ) {
        const visibleItems = getVisibleItems(items, inputValue);
        return (
            <Paper square>
                {
                    visibleItems.map((item, index) => {
                        const itemProps = getItemProps({
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                        });                        
                        return (
                            <MenuItem key={ item.value } {...itemProps}>{ item.value }</MenuItem>
                        );
                    })
                }
            </Paper>
        );
    }
    return false;
}

const PreviewPicker = createReactClass({
    getInitialState() {
        return {
            selectedItems: [],
            inputValue: ""
        };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({
            inputValue: inputChangeEvent.target.value
        });
    },
    handleKeyDown(keyDownEvent) {
        const { inputValue } = this.state;
        if (!inputValue.length && keycode(keyDownEvent) === 'backspace') {
            this.setState(oldState => {                
                return {
                    selectedItems: withoutLastItem(oldState.selectedItems)
                };
            });                
        }
    },
    handleAddItem(itemToAdd) {
        this.setState(oldState => {            
            return {
                selectedItems: [...oldState.selectedItems, itemToAdd],
                inputValue: ""
            };
        });            
    },
    handleDeleteItem(itemToDelete) {
        this.setState(oldState => {            
            return { 
                selectedItems: oldState.selectedItems.filter(item => item !== itemToDelete)
            };
        });
    },
    getInputAdornments() {        
        return this.state.selectedItems.map(item =>
            (
                <Chip
                    key={item.value}
                    tabIndex={ -1 }
                    label={ item.value }
                    onDelete={ () => this.handleDeleteItem(item) }
                />
            )
        );
    },
    render() {
        const { inputValue } = this.state;        
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