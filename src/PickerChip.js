import React from 'react';
import createReactClass from 'create-react-class';
import { Chip } from 'material-ui';

const PickerChip = createReactClass({    
    render() {
        const { item, onDelete, onClick } = this.props;        
        return (
            <Chip tabIndex={ -1 } label={ item.value } onDelete={ onDelete } onClick={ onClick } />      
        );
    }
});

export default PickerChip;
