import React from "react";
import { Chip, Tooltip } from "material-ui";
import { withStyles } from "material-ui/styles";
import { fade } from "material-ui/styles/colorManipulator";
import { func, bool, object, string } from "prop-types";

const DELETE_ICON_FADE_RATIO = 0.5;

const styles = theme => ({
    highlight: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    root: {
        marginRight: "4px"
    },
    clickable: {
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark
        },
        "&:active": {
            backgroundColor: theme.palette.primary.dark
        }
    },
    deletable: {
        "&:focus": {
            backgroundColor: theme.palette.primary.dark
        }
    },
    deleteIcon: {
        color: fade(theme.palette.primary.contrastText, DELETE_ICON_FADE_RATIO),
        "&:hover": {
            color: theme.palette.primary.contrastText
        }
    }
});

function PickerChip({ onDelete, onClick, isHighlighted, classes, label }) {
    const { highlight, ...chipClasses } = classes;
    const className = isHighlighted ? highlight : "";
    return (
        <Tooltip title="Click to show preview">
            <Chip className={ className } tabIndex={ -1 } label={ label } onDelete={ onDelete } onClick={ onClick } classes={ chipClasses } />
        </Tooltip>
    );
}

PickerChip.propTypes = {
    onDelete: func.isRequired,
    onClick: func.isRequired,
    isHighlighted: bool,
    classes: object.isRequired,
    label: string.isRequired
};

export default withStyles(styles)(PickerChip);
