<template>
  <div class="base-input">
    <label v-if="labelText" :for="id" class="base-input__label">
      {{ labelText }}
    </label>

    <input
      :id="id"
      v-model.trim="inputModel"
      type="text"
      class="base-input__field"
      @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "base-input",
});

defineProps<{
  id: string;
  labelText?: string;
}>();

defineEmits<{
  (e: "enter"): void;
}>();

const inputModel = defineModel<string>({ required: true, default: "" });
</script>

<style lang="scss">
.base-input {
  position: relative;

  &__label {
    position: absolute;
    top: -10px;
    left: 15px;

    font-weight: 400;

    background-color: white;
  }

  &__field {
    width: 100%;
    border: 1px solid black;
    border-radius: 12px;
    padding: 10px 15px;
  }
}
</style>
