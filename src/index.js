import React from 'react';
import createReactClass from 'create-react-class';
import Downshift from 'downshift';
import keycode from 'keycode';
import PickerInput from './PickerInput';
import PickerDropdown from './PickerDropdown';
import PickerChip from './PickerChip';
import { Paper, Typography } from 'material-ui';


function withoutLastItem(array) {
    if ( array.length ) {        
        return array.slice(0, array.length - 1);
    }
    return array;
}

const PickedItemSection = createReactClass({
    getInitialState() {
        return { isExpanded: false };
    },
    render() {
        const { item } = this.props;
        const rows = Array(item.rows).fill('some row');
        return (
            <Paper square>
                <Typography>item.value</Typography>
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
});

const PreviewPicker = createReactClass({
    getInitialState() {
        return {
            selectedItems: [],
            inputValue: ""
        };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({ inputValue: inputChangeEvent.target.value });
    },
    handleKeyDown(keyDownEvent) {
        const { inputValue } = this.state;
        if (!inputValue.length && keycode(keyDownEvent) === 'backspace') {
            this.setState(oldState => {                
                return { selectedItems: withoutLastItem(oldState.selectedItems) };
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
                <PickerChip 
                    key={ item.value }
                    item={ item }
                    onDelete={ () => this.handleDeleteItem(item) }
                    onClick={ () => window.alert('show full deets') }
                />
            )
        );
    },
    render() {
        const { inputValue, selectedItems } = this.state;
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
                            {
                                selectedItems.map(item => 
                                    (
                                        <PickedItemSection key={ item.value } item={ item } />
                                    )
                                )
                            }
                        </div>
                    )
                }
            </Downshift>
          );
    }
});

export default PreviewPicker;