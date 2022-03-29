<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.bg-color-1{
    background-color: rgb(213, 0, 0) !important;   
}

.bg-color-2 {
    background-color: rgb(230, 124, 115) !important;   
}

.bg-color-3 {
    background-color: rgb(244, 81, 30) !important;   
}

.bg-color-4 {
    background-color: rgb(246, 191, 38) !important;   
}

.bg-color-5 {
    background-color: rgb(51, 182, 121) !important;   
}

.bg-color-6 {
    background-color: rgb(11, 128, 67) !important;   
}

.bg-color-7 {
    background-color: rgb(3, 155, 229) !important;   
}

.bg-color-8 {
    background-color: rgb(63, 81, 181) !important;   
}

.bg-color-9 {
    background-color: rgb(121, 134, 203) !important;   
}

.bg-color-10 {
    background-color: rgb(142, 36, 170) !important;   
}
</style>
