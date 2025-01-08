import { defineStore } from "pinia";
import type { AccountType } from "../types/accountType";
import { v4 as uuidv4 } from "uuid";

interface AccountStateTypes {
  accounts: AccountType[];
}

const useAccountStore = defineStore("account", {
  state: (): AccountStateTypes => {
    const savedState = localStorage.getItem("accountState");
    return savedState ? JSON.parse(savedState) : { accounts: [] };
  },

  actions: {
    addAccount() {
      this.accounts.push({
        id: uuidv4(),
        mark: "",
        markArray: [],
        login: "",
        password: "",
        type: "Локальная",
      });
    },
    deleteAccount(id: string) {
      const index = this.accounts.findIndex((el) => el.id === id);
      if (index !== -1) {
        this.accounts.splice(index, 1);
      }
    },
    updateAccount(account: AccountType) {
      const index = this.accounts.findIndex(el => el.id === account.id);
      if (index !== -1) {
        this.accounts[index] = { ...account, markArray: account.mark.split(';')
          .map(item => ({ text: item.trim() }))
          .filter(item => item.text)  };
      }
    }
  }  
});

export default useAccountStore;
