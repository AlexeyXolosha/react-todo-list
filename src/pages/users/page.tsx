import {createUser, deleteUser, fetchUsers} from "../../shared/api.ts";
import {Suspense, use, useActionState} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {createUserAction, deleteUserAction} from "./actions.ts";
import {useUsers} from "./use-users.ts";

type User = {
    id: string;
    email: string;
};

export function UsersPage() {
    const [usersPromise, refetchUsers] = useUsers()

    return (
        <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
            <h1 className='text-3xl'>Users</h1>
            <section>
                <CreateUserForm refetchUsers={refetchUsers}/>
            </section>
            <ErrorBoundary fallbackRender={(e) => <div className="text-red-600 font-bold">Somethin went
                wrong:{JSON.stringify(e)}</div>}>
                <Suspense fallback={<div>Loading users...</div>}>
                    <UsersList refetchUsers={refetchUsers} usersPromise={usersPromise}/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export function CreateUserForm({refetchUsers}: { refetchUsers?: () => void }) {
    const [state, dispatch, isPending] = useActionState(createUserAction({refetchUsers}), {
        email: "",
    });

    return (
        <form className='flex gap-2 mb-2' action={dispatch}>
            <input defaultValue={state.email} name="email" className="border p-2 rounded" type="email"
                   disabled={isPending}/>
            <button disabled={isPending}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-2xl'
                    type='submit'>Добавить
            </button>
            {state?.error && <div className="text-red-600 font-bold">{state.error}</div>}
        </form>
    )
}

export function UsersList({usersPromise, refetchUsers}: { usersPromise: Promise<User[]>, refetchUsers: () => void }) {
    const users = use(usersPromise);
    return (
        <section>
            <ul className="flex flex-col">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} refetchUsers={refetchUsers}/>
                ))}
            </ul>
        </section>
    )
}

export function UserCard({user, refetchUsers}: { user: User, refetchUsers: () => void }) {

    const [state, handleDelete, isPending] = useActionState(deleteUserAction({id: user.id, refetchUsers}), {});

    return (
        <li className='flex justify-between items-center p-4 mb-2 rounded bg-gray-100 :' key={user.id}>
            <span>{user.email}</span>
            <form action={handleDelete}>
                <button
                    className='bg-red-500 cursor-pointer hover:bg-red-700 text-white font-medium py-2 px-4 rounded-2xl'
                    disabled={isPending}>Delete
                    {state.error && <div className="text-red-600 font-bold">{state.error}</div>}
                </button>
            </form>
        </li>
    )
}