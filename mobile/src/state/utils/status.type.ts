export type Status = "error" | "success" | "loading" | "initial";

interface TTypes {
	ERROR: Status;
	SUCCESS: Status;
	LOADING: Status;
	INITIAL: Status;
}

export const StatusTypes: TTypes = {
	ERROR: "error",
	SUCCESS: "success",
	LOADING: "loading",
	INITIAL: "initial",
};

export function isStatusSuccess(status: Status) {
	return status === "success";
}

export function isStatusLoading(status: Status) {
	return status === "loading";
}

export function isStatusError(status: Status) {
	return status === "error";
}
