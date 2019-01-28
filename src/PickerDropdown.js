import React from 'react';
import { Paper, MenuItem } from 'material-ui';

const items = [
    {value: 'apple', rows: 15 },
    {value: 'pear', rows: 2 },
    {value: 'orange', rows: 7 },
    {value: 'grape', rows: 20 },
    {value: 'banana', rows: 500 },
];

function getVisibleItems(items, inputValue) {
    if ( inputValue ) {
        return items.filter(item => item.value.includes(inputValue));
    }
    return items;
}

function PickerDropdown(props) {
    const { isOpen, inputValue, highlightedIndex, getItemProps } = props;
    if ( isOpen ) {
        const visibleItems = getVisibleItems(items, inputValue);
        return (
            <Paper square style={{ position: "absolute" }}>
                {
                    visibleItems.map((item, index) => {
                        const itemProps = getItemProps({
                            index,
                            item,
                            style: {
                                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white'                              
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

export default PickerDropdown;