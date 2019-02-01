import React from "react";
import { Typography, Paper, Button } from "material-ui";
import { any, func } from "prop-types";

function PickedItemSection({ item, onClose, PreviewComponent, itemToString }) {
    return (
        <Paper square>
            <Typography>
                Details for { itemToString(item) }
                <Button onClick={ onClose }>Close preview</Button>
            </Typography>
            <PreviewComponent item={ item } />
        </Paper>
    );
}

PickedItemSection.propTypes = {
    item: any,
    onClose: func.isRequired,
    PreviewComponent: any.isRequired,
    itemToString: func.isRequired
};

export default PickedItemSection;
