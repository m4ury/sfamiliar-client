<template>
  <main-nav />
  <router-view />
</template>
<script>
import MainNav from "@/components/Navigation/MainNav";

export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>
