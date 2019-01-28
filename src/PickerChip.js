import React from 'react';
import createReactClass from 'create-react-class';
import { Chip, Tooltip } from 'material-ui';

const PickerChip = createReactClass({    
    render() {
        const { item, onDelete, onClick, isHighlighted } = this.props;
        const style = isHighlighted ? { color: "#fff", backgroundColor: "#239" } : undefined;
        return (
            <Tooltip title="Click to show preview">
                <Chip tabIndex={ -1 } style={ style } label={ item.value } onDelete={ onDelete } onClick={ onClick } />      
            </Tooltip>
        );
    }
});

export default PickerChip;
