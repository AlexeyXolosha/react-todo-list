import {createUser, fetchUsers} from "../../shared/api.ts";
import {Suspense, useState, use} from "react";

type User = {
    id: string;
    email: string;
};

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
    const [usersPromise, setUserPromise] = useState(defaultUsersPromise);
    const refetchUsers = () => setUserPromise(fetchUsers());

    return (
        <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
            <h1 className='text-3xl'>Users</h1>
            <section>
                <CreateUserForm refetchUsers={refetchUsers}/>
            </section>
            <Suspense fallback={<div>Loading users...</div>}>
                <UsersList usersPromise={usersPromise}/>
            </Suspense>
        </main>
    );
}

export function CreateUserForm({refetchUsers}: { refetchUsers?: () => void }) {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await createUser({
            email,
            id: crypto.randomUUID(),
        });
        refetchUsers();
        setEmail("");
    };

    return (
        <form className='flex gap-2 mb-2' onSubmit={handleSubmit}>
            <input className="border p-2 rounded" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-2xl'
                    type='submit'>Добавить
            </button>
        </form>
    )
}

export function UsersList({usersPromise}: { usersPromise: Promise<User[]> }) {
    const users = use(usersPromise);
    return (
        <section>
            <ul className="flex flex-col">
                {users.map((user) => (
                    <UserCard key={user.id} user={user}/>
                ))}
            </ul>
        </section>
    )
}

export function UserCard({user}: { user: User }) {
    return (
        <li className='flex justify-between items-center p-4 mb-2 rounded bg-gray-100 :' key={user.id}>
            <span>{user.email}</span>
            <button onClick={() => handleDelete(user.id)}
                    className='bg-red-500 cursor-pointer hover:bg-red-700 text-white font-medium py-2 px-4 rounded-2xl'>Delete
            </button>
        </li>
    )
}