/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import PreviewPicker from "./index";
import { Chip } from "material-ui";

describe("Preview Picker", () => {
    it("renders", () => {
        const wrapper = mount(
            <PreviewPicker
                value={ ["some-item"] }
                itemToString={ item => item }
            />
        );
        const itemChip = wrapper.find(Chip);
        expect(itemChip).toHaveLength(1);
        expect(itemChip).toHaveText("some-item");
    });
});
