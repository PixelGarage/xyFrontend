<script>
  export default {
    props: {
      orientation: {
        type: String,
        default: 'horizontal'
      },
      buttonSize: {
        type: String,
        default: 'medium'
      },
      align: {
        type: String,
        default: 'left'
      },
    },
    data () {
      return {
        facebookLink: 'https://www.facebook.com/DeinGrundeinkommen',
        youtubeLink: 'https://www.youtube.com/channel/UCRzH4sZPJZQKN6GJtRzev9Q',
        instagramLink: 'https://www.instagram.com/dein.grundeinkommen/',
      }
    },
    computed: {
      followButtonsClass: function () {
        return 'follow-links ' + this.align + ' ' + this.buttonSize + ' ' + this.orientation;
      },
    },
  }
</script>

<template>
  <div :class="followButtonsClass">
    <div class="follow d-my-s1">
      <div class="follow-button facebook">
        <a
            :href="facebookLink"
            class="follow-link follow-link-facebook"
            title="Dein Grundeinkommen folgen auf Facebook"
            target="_blank"><span class="fab fa-facebook-f"></span></a>
      </div>
      <div class="follow-button youtube">
        <a
            :href="youtubeLink"
            class="follow-link follow-link-youtube"
            title="Dein Grundeinkommen folgen auf Youtube"
            target="_blank"><span class="fab fa-youtube"></span></a>
      </div>
      <div class="follow-button instagram">
        <a
            :href="instagramLink"
            class="follow-link follow-link-instagram"
            title="Dein Grundeinkommen folgen auf Instagram"
            target="_blank"><span class="fab fa-instagram"></span></a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  /*
   *  Follow component section
   * --------------------------------------------------*/
  @import '~/assets/scss/component.scss';

  $c: 'follow';

  .#{$c} {

    .left & {
      text-align: left;
    }
    .center & {
      text-align: center;
    }
    .right & {
      text-align: right;
    }

    .follow-button {

      // orientation
      .horizontal & {
        display: inline-block;
        margin-right: 2rem;
      }
      .vertical & {
        display: block;
        margin-bottom: 2rem;
      }

      // button size
      .small & {
        @include pxl-font-size(subtext);
      }
      .medium & {
        @include pxl-font-size(text);
      }
      .large & {
        @include pxl-font-size(subtitle);
      }
    }

  }

</style>
