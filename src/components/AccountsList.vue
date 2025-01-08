<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import useAccountStore from "../store/accountsStore";
import AccountItem from "./AccountItem.vue";

const accountStore = useAccountStore();
const { accounts } = accountStore;

let unsubscribe: (() => void) | null = null
onMounted(() => {
  unsubscribe = accountStore.$subscribe((_mutation, state) => {
    localStorage.setItem("accountState", JSON.stringify(state));
  });
});
onUnmounted(() => {
  unsubscribe?.();
});
</script>

<template>
    <div>
    <AccountItem
      v-for="(account, index) in accounts"
      :key="account.id"
      :account="account"
      :index="index"
    />
  </div>
</template>

<style scoped>
</style>
