import { requests } from "../agent";
import { UpdateAccountRequest } from "./requests";
import { DeleteAccountResponse, GetAccountDetailsResponse, UpdateAccountResponse } from "./responses";

export const AccountApi = {
	update: (body: UpdateAccountRequest): Promise<UpdateAccountResponse> => requests.put("Account/update", body),
	delete: (): Promise<DeleteAccountResponse> => requests.delete("Account/delete-account"),
	getDetails: (): Promise<GetAccountDetailsResponse> => requests.get("Account/Details"),
};
