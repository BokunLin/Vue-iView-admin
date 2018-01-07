<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  body{
    width: 100%;
    height: 100%;
    #app {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
