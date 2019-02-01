import React from "react";
import { Typography, Paper, Button } from "material-ui";
import { any, func } from "prop-types";

function PickedItemSection({ item, onClose, PreviewComponent, itemToString }) {
    return (
        <Paper square>
            <div style={ { display: "flex", alignItems: "center", margin: "0 4px" }}>
                <Typography variant="headline" style={ { flex: "1 1 auto" }}>
                    Details for { itemToString(item) }
                </Typography>
                <Button onClick={ onClose }>Close</Button>
            </div>

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
