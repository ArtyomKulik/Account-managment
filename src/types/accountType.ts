export type AccountType = {
  id: string;
  mark: string;
  markArray: {text: string}[]
  login: string;
  password: string;
  type: "Локальная" | "LDAP";
};
