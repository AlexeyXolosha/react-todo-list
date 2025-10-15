import {startTransition, useState} from "react";
import {fetchUsers} from "../../shared/api.ts";

const defaultUsersPromise = fetchUsers();

export function useUsers() {
    const [usersPromise, setUserPromise] = useState(defaultUsersPromise);
    const refetchUsers = () => startTransition(() => {
        setUserPromise(fetchUsers());
    })

    return [usersPromise, refetchUsers] as const;
}