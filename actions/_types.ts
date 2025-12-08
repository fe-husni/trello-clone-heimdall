export type ActionState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; error: Error }
    | { status: "success"; data: T };

    export function ok<T>(data: T): ActionState<T> {
    return { status: "success", data };
    }

export function fail<T = never>(error: Error): ActionState<T> {
    return { status: "error", error };
    }