import React from "react";
import { Paper, MenuItem } from "material-ui";

function PickerDropdown({ isOpen, inputValue, highlightedIndex, selectedItems, getItemProps, getSuggestedItems, itemToString }) {
    if ( isOpen ) {
        const visibleItems = getSuggestedItems(inputValue, selectedItems);
        return (
            <Paper square elevation={ 10 } style={{ position: "absolute", zIndex: 100 }}>
                {
                    visibleItems.map((item, index) => {
                        const itemProps = getItemProps({
                            index,
                            item,
                            style: {
                                backgroundColor: highlightedIndex === index ? "lightgray" : "white"
                            },
                        });
                        const itemString = itemToString(item);
                        return (
                            <MenuItem key={ itemString } {...itemProps}>{ itemString }</MenuItem>
                        );
                    })
                }
            </Paper>
        );
    }
    return false;
}

export default PickerDropdown;
