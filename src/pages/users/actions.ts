import {createUser, deleteUser} from "../../shared/api.ts";

type CreateActionState = {
    email: string;
    error?: string | null;
};

export const createUserAction =
    ({refetchUsers}: {
        refetchUsers: () => void;
    }) => async (_: CreateActionState, formData: {
        email: string
    }): Promise<CreateActionState> => {
        const email = formData.get("email") as string;

        if (email === "admin@gmail.com") {
            return {
                email,
                error: "Admin account is not allowed"
            }
        }

        try {
            await createUser({
                id: crypto.randomUUID(),
                email,
            });
            refetchUsers();
            return {
                email: "",
            };
        } catch (e) {
            return {
                email,
                error: "Error while creating user",
            }
        }
    };


type DeleteUserActionState = {
    error?: string;
}

export const deleteUserAction = ({refetchUsers, id }: {
    refetchUsers: () => void;
    id: String;
}) => async (): Promise<DeleteUserActionState> => {
    try {
        await deleteUser(id);
        refetchUsers();
        return {};
    } catch {
        return {
            error: "Error while deleting user"
        }
    }
}