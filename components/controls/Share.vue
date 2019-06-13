<script>
/*
 * Shariff social buttons.
 *
 * Properties of this control are the same as the Shariff button attributes, except that
 * the data- part is omitted, e.g. data-button-style --> button-style or buttonStyle.
 *
 * Two additional properties are available:
 * @property align String
 *    Value is one of "left", "center", "right".
 *    Defines the alignment of the title and shariff buttons inside the container. Default center
 *
 * @property buttonSize String
 *    Value is one of "small", "medium", "large".
 *    Defines the size of the buttons, small=text-size, medium=subtitle-size, large=title-size. Default medium.
 */

export default {
  name: 'share',
  props: {
    title: String,
    services: Array,
    url: String,
    lang: String,
    mailUrl: {
      type: String,
      default: 'mailto:'
    },
    orientation: {
      type: String,
      default: 'horizontal'
    },
    buttonStyle: String,
    buttonSize: {
      type: String,
      default: 'medium'
    },
    align: {
      type: String,
      default: 'center'
    },
  },
  data () {
    return {
      urlFacebook: 'https://www.facebook.com/sharer/sharer.php',
      urlTwitter: 'https://twitter.com/intent/tweet',
      urlTelegram: 'https://t.me/share/url',
      mailSubject: encodeURI(this.$t('comp.shariff.mail-subject')),
      mailBody: encodeURI(this.$t('comp.shariff.mail-body')),
    }
  },
  computed: {
    shareUrl: function () {
      return encodeURI(this.url);
    },
    shariffButtonsClass: function () {
      return 'shariff-buttons ' + this.align + ' ' + this.buttonSize;
    },
  },
}
</script>

<template>
  <div :class="shariffButtonsClass">
    <div class="shariff" data-services="facebook,twitter,telegram,mail" :data-orientation="orientation" :data-button-style="buttonStyle" :data-lang="lang" :data-mail-body="mailBody"
      :data-mail-subject="mailSubject" data-mail-url="mailto:" :data-url="url">
      <ul class="orientation-horizontal">
        <li class="shariff-button facebook"><a :href="urlFacebook + '?u=' + shareUrl" target="_blank" data-rel="popup" rel="nofollow" title="Bei Facebook teilen" role="button" aria-label="Bei Facebook teilen"><span class="fab fa-facebook-f"></span></a></li>
        <li class="shariff-button twitter"><a :href="urlTwitter + '?text=Stell%20Dir%20vor...%20%7C%20Was%20kostet%20Grundeinkommen%3F&amp;url=' + shareUrl" target="_blank" data-rel="popup" rel="nofollow" title="Bei Twitter teilen" role="button" aria-label="Bei Twitter teilen"><span class="fab fa-twitter"></span></a></li>
        <li class="shariff-button telegram"><a :href="urlTelegram + '?url=' + shareUrl" target="_blank" data-rel="popup" rel="nofollow" title="Bei Telegram teilen" role="button" aria-label="Bei Telegram teilen"><span class="fab fa-telegram"></span></a></li>
        <li class="shariff-button mail"><a :href="'mailto:?subject=' + mailSubject + '&amp;body=' + mailBody" rel="nofollow" title="Per E-Mail versenden" role="button" aria-label="Per E-Mail versenden"><span class="fas fa-envelope"></span></a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
/*
 *  Shariff component section
 * --------------------------------------------------*/
  @import '~/assets/scss/component.scss';

  $c: 'shariff';

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

    ul {
      @include pxl-no-list-style;

      li.shariff-button {
        @include pxl-no-list-style;
        margin: 1rem;

        .small & {
          @include pxl-font-size(text);
        }
        .medium & {
          @include pxl-font-size(subtitle);
        }
        .large & {
          @include pxl-font-size(title);
        }

        &::before {
          content: "";
        }
      }
      &.orientation-horizontal {
        .shariff-button {
          display: inline-block;
        }
      }
      &.orientation-vertical {
        .shariff-button {
          display: block;
        }
      }
    }

  }

</style>
