<script setup lang="ts">
import type { FormInst, FormItemRule } from "naive-ui";
import { ref, reactive } from "vue";
import useAccountStore from "../store/accountsStore";
import type { AccountType } from "../types/accountType";
import { optionsType } from "../constants/contants";

const props = defineProps<{
  account: AccountType;
  index: number
}>();
const accountStore = useAccountStore();
const { deleteAccount, updateAccount } = accountStore;

const formRef = ref<FormInst | null>(null);

const accountValuesValidation = reactive({
  markIsValid:  props.account.mark.length > 0 ? /^[^;]+(?:;\s[^;]+)*$/.test(props.account.mark) : true,
  typeIsValid:  Boolean(props.account.type),
  loginIsValid: Boolean(props.account.login.trim()),
  passwordIsValid: Boolean(props.account.password.trim()),
});
const validateAndSave = async () => {
  try {
    const validateData = await formRef.value?.validate();
    if(!validateData?.warnings) {
      updateAccount(props.account);
    }
  } catch (errors) {
    console.error('Validation failed:', errors);
  }
};

const size = ref<"small" | "medium" | "large">("medium");
const rules = {
  mark: {
    required: false,
    message: "Формат: текст; текст; текст",
    trigger: ["blur"],
    validator: (_rule: FormItemRule, value: string) => {

      if (!value.length) {
        accountValuesValidation.markIsValid = true;
        return true;
      }
      const isValid = /^[^\s;]+(?:;\s[^\s;]+)*$/.test(value);
      accountValuesValidation.markIsValid = isValid;
      return isValid;
    },
},
  type: {
    required: true,
    message: "Тип",
    trigger: "change",
    validator: (_value: string) => {
        accountValuesValidation.loginIsValid = true
        return true
    }
  },
  login: {
    required: true,
    message: "Введите логин",
    trigger: "blur",
    validator: (_rule: FormItemRule, value: string) => {
      if(value.trim()) {
        accountValuesValidation.loginIsValid = true;
        return true;
      }
    }
  },
  password: {
    required: true,
    message: "Проверьте ввод пароля",
    trigger: "blur",
    validator: (_rule: FormItemRule, value: string) => {
      if(value.trim()) {
        accountValuesValidation.passwordIsValid = true;
        return true;
      }
    }
  },
};


</script>

<template>


  <n-form
    inline
    ref="formRef"
    :label-width="80"
    :model="props.account"
    :rules="rules"
    :size="size"
    :require-mark-placement="null"
  >
    <n-form-item path="mark" :label="index === 0 ? 'Метка' : ''">
      <n-input
      :status="accountValuesValidation.markIsValid ? 'success' : 'error'"
        maxlength="50"
        show-count
        v-model:value="props.account.mark"
        placeholder="Метка"
        @blur="validateAndSave"
      />
    </n-form-item>
    <n-form-item path="type" :label="index === 0 ? 'Тип' : ''">
      <n-select :status="accountValuesValidation.typeIsValid ? 'success' : 'error'"
      v-model:value="props.account.type" :options="optionsType"  @update:value="validateAndSave"
      />
    </n-form-item>
    <n-form-item path="login" :label="index === 0 ? 'Логин' : ''">
      <n-input
        :status="accountValuesValidation.loginIsValid ? 'success' : 'error'"
        maxlength="100"
        show-count
        v-model:value="props.account.login"
        placeholder="Логин"
        @blur="validateAndSave"
      />
    </n-form-item>
    <n-form-item
      v-if="props.account.type === optionsType[0].value"
      class="n-input-wrapper n-input__suffix n-input__eye"
      path="password"
       :label="index === 0 ? 'Пароль' : ''"
    >
      <n-input
      :status="accountValuesValidation.passwordIsValid ? 'success' : 'error'"
        maxlength="100"
        show-count
        v-model:value="props.account.password"
        placeholder="Пароль"
        type="password"
        show-password-on="click"
        @blur="validateAndSave"
      />
    </n-form-item>
    <n-form-item>
      <n-button @click="deleteAccount(props.account.id)">Удалить</n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
