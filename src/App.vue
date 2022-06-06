<script setup>
  import Header from './components/Header.vue'
  import CryptoContent from './components/CryptoContent.vue'
  import Background from './components/Background.vue'
</script>

<template>
  <div class="opacityBG">
    <Background />
    <Header />
    <main>
      <CryptoContent />
    </main>
  </div>
</template>

<style>

.opacityBG {
  position: absolute;
  background-color: rgba(32,32,32,0.8);
  width: 100%;
  height: 100vh;
}
</style>
