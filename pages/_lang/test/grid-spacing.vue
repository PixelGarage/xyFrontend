<script>
  export default {
    layout: 'testing',
    data () {
      return {
        showGrid: true,
      }
    },
  }
</script>

<template>
  <div class="theme-white-black" :show-grid="showGrid">
    <header>
      <div class="block-title">Header</div>
      <b-container fluid>
        <div class="content"></div>
      </b-container>
    </header>
    <div class="main-container">
      <b-container fluid>
        <div class="fixed-dialog">
          <label class="checkbox-container">Show grid
            <input type="checkbox" v-model="showGrid">
            <span class="checkmark"></span>
          </label>
        </div>
        <main>
          <div class="block-title">Main</div>
          <div class="row">
            <div class="col col-12">
              <article>
                <div class="block-title">Article</div>
                <section class="theme-lightgray-black">
                  <h1 class="bold">Section 2</h1>
                  <Headline tag="h2">Ich bin eine etwas längere headline h2.headline</Headline>
                  <p class="intermediate-title">Der Reisende p.zwischentitel</p>
                  <p>Jemand musste <a href="" target="_blank">Josef K. verleumdet</a> haben. p</p>
                  <p class="marginal"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens erwachte. p.marginal</p>
                  <p class="legend">Er wurde eines Morgens verhaftet. Als sollte die Scham ihn überleben. p.legende</p>
                </section>
                <section class="theme-gold-black">
                  <div class="row">
                    <div class="col col-12">
                      <h1 class="bold">Section First</h1>
                      <Headline tag="h2">Ich bin eine etwas längere headline h2.headline</Headline>
                      <p class="intermediate-title">Der Reisende p.zwischentitel</p>
                      <p>Jemand musste <a href="" target="_blank">Josef K. verleumdet</a> haben. p</p>
                      <p class="marginal"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens erwachte. p.marginal</p>
                      <p class="legend">Er wurde eines Morgens verhaftet. Als sollte die Scham ihn überleben. p.legende</p>
                    </div>
                  </div>
                </section>
                <section  class="theme-darkgray-white full-width">
                  <h1 class="bold">Section full-width</h1>
                  <Headline tag="h2">Ich bin eine etwas längere headline h2.headline</Headline>
                  <p class="intermediate-title">Der Reisende p.zwischentitel</p>
                  <p>Jemand musste <a href="" target="_blank">Josef K. verleumdet</a> haben. p</p>
                  <p class="marginal"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens erwachte. p.marginal</p>
                  <p class="legend">Er wurde eines Morgens verhaftet. Als sollte die Scham ihn überleben. p.legende</p>
                </section>
                <section  class="theme-black-lightgray">
                  <h1 class="bold">Section Last</h1>
                  <Headline tag="h2">Ich bin eine etwas längere headline h2.headline</Headline>
                  <p class="intermediate-title">Der Reisende p.zwischentitel</p>
                  <p>Jemand musste <a href="" target="_blank">Josef K. verleumdet</a> haben. p</p>
                  <p class="marginal"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens erwachte. p.marginal</p>
                  <p class="legend">Er wurde eines Morgens verhaftet. Als sollte die Scham ihn überleben. p.legende</p>
                </section>
              </article>
            </div>
          </div>
          <div class="row">
            <div class="col col-12 col-md-6">
              <section>
                <p class="intermediate-title">Form elements</p>
                <input type="text" placeholder="Text">
                <input type="tel" placeholder="+41 079 179 79 79">
                <input type="time" placeholder="12:00">
                <input type="url" placeholder="https://schaetti-lehmann.ch">
                <input type="range">
                <label class="checkbox-container">Option A
                  <input type="checkbox">
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox-container">Option B
                  <input type="checkbox" checked>
                  <span class="checkmark"></span>
                </label>
                <input type="button" value="Button">
                <span class="button-more">Weiter</span>
              </section>
            </div>
            <div class="col col-12 col-md-6">
              <div>
                <h2>Verschachtelte Textfelder. h2</h2>
              </div>
              <div>
                <p>Dieser Paragraph ist ummantelt. p</p>
              </div>
              <div>
                <p class="marginal">Dieser Text ist ummantelt. p.marginal</p>
              </div>
              <div>
                <p class="legend">Dieser Text ist ummantelt. p.legend</p>
              </div>
            </div>
          </div>
        </main>
      </b-container>
    </div>
    <footer>
      <div class="block-title">Footer</div>
      <b-container fluid>
        <div class="content"></div>
      </b-container>
    </footer>
  </div>
</template>

<style lang="scss">

  .fixed-dialog {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }

  .block-title {
    display: none;
  }
  header, footer {
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;

    .content {
      min-height: 50px;
    }
  }

  [show-grid] {

    .block-title {
      display: block;
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 100;
      font-size: 12px;
      line-height: 1;
    }

    .container, .container-fluid {
      background-color: lightblue;
    }
    header, footer {
      background-color: lightgreen;
      border-top: 2px solid black;
      border-bottom: 2px solid black;

      .content {
        min-height: 50px;
      }
    }
    main {
      background-color: green;
    }
    article {
      background-color: green;
    }
    section {
      color: black;
      background-color: lightyellow;
    }
    .row {
      background-color: red;
    }
    .col{
      color: black;
      background-color: lightgreen;
    }
    .content {
      width: 100%;
      min-height: 150px;
      background-color: whitesmoke;
    }
  }

</style>
