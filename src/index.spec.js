/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import PreviewPicker from "./index";

describe("Preview Picker", () => {
    it("renders", () => {
        const wrapper = mount(<PreviewPicker value={ [] } />);
        expect(wrapper).not.toBeEmptyRender();
    });
});
