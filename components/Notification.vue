<template>
  <div class="notification is-danger bg-danger">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'Notification',
    props: ['message']
  }
</script>
