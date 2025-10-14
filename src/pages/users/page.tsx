import {fetchUsers} from "../../shared/api.ts";

type User = {
    id: string;
    email: string;
};

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
    return (
        <main className="container mx-auto p-4 pt-10 flex flex-col gap-4">
            <h1 className='text-3xl'>Users</h1>
            <section>
                <CreateUserForm/>
            </section>
            <UsersList users={[
                {id: '1', email: 'daddadad@gmail.com'},
                {id: '2', email: 'dadasdadad2@mail.ru'}
            ]}/>
        </main>
    );
}

export function CreateUserForm() {
    return (
        <form className='flex gap-2 mb-2'>
            <input className="border p-2 rounded" type="text"/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-2xl'
                    type='button'>Добавить
            </button>
        </form>
    )
}

export function UsersList({users}: { users: User[] }) {
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