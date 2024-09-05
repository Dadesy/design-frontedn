<template>
  <a-card class="rounded-none border-l-0 border-r-0 border-t-0 card-header">
    <div class="flex items-center gap-5">
      <a href="/" class="logo w-40">
        <the-logo class="block" />
      </a>
      <pages-menu />

      <div class="profile">
        <img src="../../assets//img/user.png" class="block"/>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import TheLogo from '../TheLogo/TheLogo.vue';
import PagesMenu from '../PagesMenu/PagesMenu.vue';

</script>
<style>
.card-header .ant-card-body {
  @apply pt-0 pb-0;
}

.profile {
  @apply ml-auto rounded-full w-10 h-10 min-w-10 cursor-pointer;
}
</style>
