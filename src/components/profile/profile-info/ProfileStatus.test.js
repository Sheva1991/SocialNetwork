import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="social network" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("social network");
    });
    test("after creating span should be dispaly", () => {
        const component = create(<ProfileStatus status="social network" />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull();
    });
    test("after creating input shouldn't be dispaly", () => {
        const component = create(<ProfileStatus status="social network" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input')
        }).toThrow();
    });
    test("after creating <span> with status should be dispaly with correct status", () => {
        const component = create(<ProfileStatus status="social network" />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('social network');
    });
    test("input should be dispaled at editMode instead os span", () => {
        const component = create(<ProfileStatus status="social network" />);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('social network');
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="social network" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});