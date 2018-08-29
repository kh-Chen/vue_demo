<template>
  <FormItem :label="label">
    <Select v-model="formItem.select">
      <Option v-for="Option in Options" :key="Option.value" :value="Option.value">{{Option.name}}</Option>
    </Select>
  </FormItem>
</template>

<script>
    export default {
      name: "selectCombo",
      props:['label','Options']
    }
</script>

<style scoped>

</style>
