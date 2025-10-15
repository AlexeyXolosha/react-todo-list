import {createUser, deleteUser} from "../../shared/api.ts";

type CreateActionState = {
    email: string;
    error?: string | null;
};

export const CreateUserAction = (state: CreateActionState, formData: FormData) => Promise<CreateActionState>;

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

export function deleteUserAction({refetchUsers}: { refetchUsers: () => void }) {
    return async (
        state: DeleteUserActionState,
        formData: FormData
    ): Promise<DeleteUserActionState> => {
        const id = formData.get("id") as string;
        try {
            await deleteUser(id);
            refetchUsers();
            return {};
        } catch (e) {
            return {
                error: "Error while deleting user",
            };
        }
    }
}

