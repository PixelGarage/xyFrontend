<script>
  import Section from '~/components/Section.vue';
  import TestFormElements from '~/components/test/TestFormElements.vue';

  export default {
    layout: 'testing',
    components: {
      Section, TestFormElements
    },
    data () {
      return {
        fluid: true,
      }
    },
  }

</script>

<template>
  <div class="test-form-elements">
    <Section class="theme-black-lightgray">
      <!-- The following span prevents a unexplainable $scopedSlot error-->
      <span></span>
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-black-gold">
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-white-black">
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-gold-black">
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-gold-white">
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-lightgray-black">
      <TestFormElements :fluid="fluid"/>
    </Section>

    <Section class="theme-darkgray-white">
      <TestFormElements :fluid="fluid"/>
    </Section>
  </div>
</template>
