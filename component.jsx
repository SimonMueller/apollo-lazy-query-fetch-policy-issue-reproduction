import React, {useEffect} from 'react';
import {gql, useLazyQuery} from "@apollo/client";

export const GET_DATA = gql`
    query GetData($variable: String) {
        Object {
            id
        }
    }
`;

export default function Component({input, fetchPolicy}) {
    const [getData, { data }] = useLazyQuery(GET_DATA, {fetchPolicy});

    useEffect(() => {
        getData({variables: {input: "my input"}});
    }, [input, getData])

    return <div>{JSON.stringify(data)}</div>
}