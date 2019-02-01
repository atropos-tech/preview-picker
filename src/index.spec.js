/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import PreviewPicker from "./Picker";

describe("Preview Picker", () => {
    it("renders", () => {
        const wrapper = mount(<PreviewPicker />);
        expect(wrapper).not.toBeEmptyRender();
    });
});
