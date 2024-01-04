<template>
  <div>
    <button class="accordion" @click="toggleAccordion">
      {{ title }}
    </button>
    <div class="panel" v-bind:style="{ maxHeight: isOpen ? maxPanelHeight + 'px' : '0' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionItem',
  props: ['title'],
  data() {
    return {
      isOpen: false,
      maxPanelHeight: 0
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
      this.$nextTick(() => {
        this.maxPanelHeight = this.$el.querySelector('.panel').scrollHeight;
      });
    }
  }
};
</script>
