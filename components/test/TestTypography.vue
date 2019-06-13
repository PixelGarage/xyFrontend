<script>
  export default {
    props: {
      fluid: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>

<template>
  <b-container :fluid="fluid">
    <div class="row">
      <div class="col col-12">
        <Headline tag="h1">Ich bin eine etwas längere headline h1.headline</Headline>
        <h1 class="bold">Der Reisende hob ein überaus grosses und sperriges Tau in die Höhe. h1.bold</h1>
        <h1>Der Reisende hob ein überaus grosses und <a href="#" target="_blank">sperriges Tau</a> in die Höhe. h1</h1>
        <Headline tag="h2">Ich bin eine etwas längere headline h2.headline</Headline>
        <h2 class="bold">Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett. h2.bold</h2>
        <h2>Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett. h2</h2>
        <p class="bold">Ich bin eine etwas längere headline im Absatz p.bold</p>
        <Headline tag="p">Ich bin eine etwas längere headline im Absatz p.headline</Headline>
        <p class="intermediate-title">Zwischentitel p.zwischentitel</p>
        <p>Jemand musste <a href="" target="_blank">Josef K. verleumdet</a> haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund! « sagte er, es war, als sollte die Scham ihn überleben. p</p>
        <p> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. p</p>
        <p class="marginal intermediate-title">Zwischentitel p.marginal.zwischentitel</p>
        <p class="marginal">Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund! «sagte er, es war, als sollte die Scham ihn überleben. p.marginal</p>
        <p class="marginal"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. p.marginal</p>
        <p class="legend intermediate-title">Zwischentitel p.legende.zwischentitel</p>
        <p class="legend">Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund! «sagte er, es war, als sollte die Scham ihn überleben. p.legende</p>
        <p class="legend"> Als <a href="#" target="_blank">Gregor Samsa</a> eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. p.legende</p>
      </div>
    </div>
  </b-container>
</template>
