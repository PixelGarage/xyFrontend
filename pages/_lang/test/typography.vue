<script>
  import Section from '~/components/Section.vue'
  import TestTypography from '~/components/test/TestTypography.vue'

  export default {
    layout: 'testing',
    components: {
      Section, TestTypography,
    },
    data () {
      return {
        fluid: true,
      }
    },
  }

</script>

<template>
  <div class="test-typography">
    <Section class="theme-black-lightgray">
      <!-- The following span prevents a unexplainable $scopedSlot error-->
      <span></span>
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-black-gold">
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-white-black">
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-gold-black">
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-gold-white">
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-lightgray-black">
      <TestTypography :fluid="fluid"/>
    </Section>

    <Section class="theme-darkgray-white">
      <TestTypography :fluid="fluid"/>
    </Section>
  </div>
</template>
