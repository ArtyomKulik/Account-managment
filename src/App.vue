<script setup lang="ts">
import AccountsList from "./components/AccountsList.vue";
import useAccountStore from "./store/accountsStore";

const accountStore = useAccountStore();
const { addAccount } = accountStore;
</script>

<template>
  <!-- <n-message-provider> -->
  <main class="accounts-main">
    <section class="accounts-main__inner">
      <n-flex class="accounts-main__header">
        <p>Учетные записи</p>
        <n-button @click="addAccount" strong secondary type="tertiary">
          +
        </n-button>
      </n-flex>
      <AccountsList />
    </section>
  </main>
  <!-- </n-message-provider> -->
</template>

<style scoped>
.accounts-main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
.accounts-main__inner {
 
  min-height: 100%;
  width: 100%;
  max-width: 1400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
.accounts-main__header {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
