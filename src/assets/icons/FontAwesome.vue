<template>
  <div>
    <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 3rem" class="ml-2" />
    <font-awesome-icon :icon="['far', 'edit']" />
    <font-awesome-icon :icon="['fab', 'github']" />
    <font-awesome-icon :icon="['far', 'bell']" />
    <font-awesome-icon :icon="['fal', 'trash-alt']" />
    <font-awesome-icon :icon="['fad', 'coffee']" />
    <v-gravatar email="jay@longisland.com" :size="30" default-img="identicon" />
    <v-gravatar email="jay@longisland.com" :size="30" default-img="mp" />
  </div>
</template>
