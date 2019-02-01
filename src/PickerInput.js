import React from "react";
import { func, string, bool, node, object } from "prop-types";
import { TextField } from "material-ui";
import { withStyles } from "material-ui/styles";

const styles = {
    rootInput: {
        display: "flex",
        flexWrap: "wrap",
        padding: "4px 0"
    }
};

function PickerInput({ value, onChange, fullWidth, startAdornment, classes, ...otherProps }) {
    const InputProps = {
        inputProps: otherProps,
        startAdornment: startAdornment.length ? startAdornment : false, //needed to make the label appear correctly,
        classes: { root: classes.rootInput }
    };

    //this ensures that the label will be shown above the input field if there are selected items,
    //even if there is no input text
    const InputLabelProps = {
        shrink: Boolean(value.length || startAdornment.length)
    };
    return (
        <TextField
            fullWidth={ fullWidth }
            label='Your favourite fruit'
            value={ value }
            onChange={ onChange }
            InputProps={ InputProps }
            InputLabelProps={ InputLabelProps }
        />
    );
}

PickerInput.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    fullWidth: bool,
    startAdornment: node,
    classes: object
};

PickerInput.defaultProps = {
    fullWidth: false,
    startAdornment: false
};

export default withStyles(styles)(PickerInput);
