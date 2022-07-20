import React from 'react';
import {render, waitFor} from "@testing-library/react";
import Component, {GET_DATA} from "./component";
import {MockedProvider} from "@apollo/client/testing";

it('fetches the data two times as the fetch policy is set to "no-cache"', async () => {
    const spy = createResultSpy();
    const view = render(<Component fetchPolicy="no-cache" input="something"/>, {wrapper: wrapper(spy)});

    view.rerender(<Component input={"something2"}/>)

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
});

it('fetches the data one time as the fetch policy is set to "cache-first"', async () => {
    const spy = createResultSpy();
    const view = render(<Component fetchPolicy="cache-first" input="something"/>, {wrapper: wrapper(spy)});

    view.rerender(<Component input={"something2"}/>)

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
});

function wrapper(resultSpy) {
    return ({children}) => (<MockedProvider mocks={[createMock(resultSpy)]}>
        {children}
    </MockedProvider>)
}

function createResultSpy() {
    return jest.fn(() => ({
        data: {
            Object: {
                id: "my id"
            }
        }
    }));
}

function createMock(resultSpy) {
    return {
        request: {
            query: GET_DATA, variables: {
                input: "my input"
            }
        }, result: resultSpy,
    };
}