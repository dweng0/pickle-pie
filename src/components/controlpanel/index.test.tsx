import React from 'react';
import ControlPanel from './index';

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as inputFactory from './formfactory';


describe("testing the control panel", () => {

    it("should compile at runtime", () => expect(ControlPanel).toBeDefined());

    it("should call dateFactory to render dates", () => {

        //setup
        const roomName = [];
        const spy = jest.spyOn(inputFactory, 'dateFactory');

        //execute
        const { getByLabelText } = render(<ControlPanel />);

        //verify
        expect(getByLabelText("On")).toBeInTheDocument();
        expect(spy).toHaveBeenCalled();
    });

    it("should call time factory to render time input ", () => {
        //setup
        const roomName = [];
        const spy = jest.spyOn(inputFactory, 'timeFactory');
        //execute
        const { getByLabelText } = render(<ControlPanel />);

        //verify
        expect(spy).toHaveBeenCalled();
    });

    it("should call input factory for text input", () => {
        //setup
        const roomName = [];
        const spy = jest.spyOn(inputFactory, 'inputFactory');
        //execute
        const { getByLabelText } = render(<ControlPanel />);

        //verify
        expect(spy).toHaveBeenCalled();
    });

    it("Should call auto complete input factory for auto completion text", () => {
        //setup
        const roomName = [];
        const spy = jest.spyOn(inputFactory, 'autoCompleteFactory');
        //execute
        const { getByLabelText } = render(<ControlPanel />);

        //verify
        expect(spy).toHaveBeenCalled();
    });
})