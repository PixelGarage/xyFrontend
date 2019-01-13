<template>
  <div class="scene">
    <div class="pxlcube">
      <cube class="cube left top front" cube-ltf orig-ltf backface-visible></cube>
      <cube class="cube right top front" cube-rtf orig-rtf backface-visible></cube>
      <cube class="cube left bottom front" cube-lbf orig-lbf backface-visible></cube>
      <cube class="cube right bottom front" cube-rbf orig-rbf face-right backface-visible></cube>
      <cube class="cube left top back" cube-ltb orig-ltb backface-visible></cube>
      <cube class="cube right top back" cube-rtb orig-rtb face-back backface-visible></cube>
      <cube class="cube left bottom back" cube-lbb orig-lbb face-left face-back backface-visible></cube>
      <cube class="cube right bottom back" cube-rbb orig-rbb backface-visible></cube>
    </div>
  </div>
</template>

<script>
import Cube from '~/components/Cube.vue';

export default {
  components: {
    Cube,
  },
  props: {
    startDelay: {type: Number, default: 1000},
    animDelay: {type: Number, default: 200},
    animDuration: {type: Number, default: 1500},
  },
  data() {
    return {

    }
  },
  methods: {
    addStepClassToCubes: function(cubes, stepClass, prevClass) {
      const prevCubes = prevClass ? this.$el.querySelectorAll('.' + prevClass) : [];
      for (let cube of cubes) {
        cube.classList.add(stepClass);
      }
      for (let prevCube of prevCubes) {
        prevCube.classList.remove(prevClass);
      }
    },
    step: function(stepNum, turn) {
      // add step class to all cubes belonging to the animating side
      // (front, back, left, right, top, bottom)
      let prevClass = '';
      if (stepNum > 1) {
        prevClass = 'step-' + (stepNum-1);
      }
      const side = turn.split('-').shift();
      const stepClass = 'step-' + stepNum;
      const cubes = this.$el.querySelectorAll('.' + side);
      this.addStepClassToCubes(cubes, stepClass, prevClass);

      // wait animation duration plus delay until next step starts
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(stepClass);
        }, this.animDuration + this.animDelay);
      });
    },
  },
  /*
  ** life cycle events
  */
  mounted () {
    // define and animate the rotations of the cube
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, this.startDelay);
    }).then(res => {
      // first turn
      return this.step(1, 'front-270');
    }).then(res => {
      // second turn
      return this.step(2, 'left-90');
    }).then(res => {
      // third turn
      return this.step(3, 'top-180');
    }).then(res => {
      // forth turn
      return this.step(4, 'front-180');
    }).catch(err => {
      console.error(`PxlLogo animation failed: ${err.message}`);
    });
  },
}
</script>


<style lang="scss" scoped>
/*
 *  PxlLogo section 
 * --------------------------------------------------*/
  @import '~/assets/scss/custom.scss';

  //
  // define animation steps
  $animDelay: 0.2s;
  $animDuration: 1.5s;
  $animation-steps: (
    'step-1': 'front-270',
    'step-2': 'left-90',
    'step-3': 'top-180',
    'step-4': 'front-180',
  );

  //
  // local variables
  $dim: 200px;
  $cube-dim: 100px;
  $cube-translation: (
    'ltf': translate3d(0, 0, $cube-dim/2),
    'rtf': translate3d($cube-dim, 0, $cube-dim/2),
    'lbf': translate3d(0, $cube-dim, $cube-dim/2),
    'rbf': translate3d($cube-dim, $cube-dim, $cube-dim/2),
    'ltb': translate3d(0, 0, -$cube-dim/2),
    'rtb': translate3d($cube-dim, 0, -$cube-dim/2),
    'lbb': translate3d(0, $cube-dim, -$cube-dim/2),
    'rbb': translate3d($cube-dim, $cube-dim, -$cube-dim/2)
  );
  $cube-origin: (
    'ltf': (bottom right (-$cube-dim/2)),
    'rtf': (bottom left (-$cube-dim/2)),
    'lbf': (top right (-$cube-dim/2)),
    'rbf': (top left (-$cube-dim/2)),
    'ltb': (bottom right ($cube-dim/2)),
    'rtb': (bottom left ($cube-dim/2)),
    'lbb': (top right ($cube-dim/2)),
    'rbb': (top left ($cube-dim/2))
  );
  $cube-turns: (
    'front-90':   rotate3d(0, 0, 1, 90deg),
    'front-180':  rotate3d(0, 0, 1, 180deg),
    'front-270':  rotate3d(0, 0, 1, -90deg),
    'back-90':    rotate3d(0, 0, 1, 90deg),
    'back-180':   rotate3d(0, 0, 1, 180deg),
    'back-270':   rotate3d(0, 0, 1, -90deg),
    'left-90':    rotate3d(1, 0, 0, 90deg),
    'left-180':   rotate3d(1, 0, 0, 180deg),
    'left-270':   rotate3d(1, 0, 0, -90deg),
    'right-90':   rotate3d(1, 0, 0, 90deg),
    'right-180':  rotate3d(1, 0, 0, 180deg),
    'right-270':  rotate3d(1, 0, 0, -90deg),
    'top-90':     rotate3d(0, 1, 0, 90deg),
    'top-180':    rotate3d(0, 1, 0, 180deg),
    'top-270':    rotate3d(0, 1, 0, -90deg),
    'bottom-90':  rotate3d(0, 1, 0, 90deg),
    'bottom-180': rotate3d(0, 1, 0, 180deg),
    'bottom-270': rotate3d(0, 1, 0, -90deg),
  );
  
  //
  // local mixins
  @mixin make-cube-anim-steps($steps: $animation-steps, $translations: $cube-translation, $origins: $cube-origin, $turns: $cube-turns) {
    //
    // create all cube rules (ltf, rtf,lbf, rbf, ltb, rtb, lbb, rbb)
    @each $cube, $transl in $translations {
      [cube-#{$cube}] {
        $cube-origin: map-get($origins, $cube);
        @include pxl-transform($transl);
        @include pxl-transform-origin($cube-origin);
        //
        // animation steps
        $transformations: ();
        @each $step, $turn in $steps {
          $animName: '#{$step}__#{$turn}__#{$cube}';
          $animTransf: map-get($turns, $turn);

          &.#{$step} {
            animation: #{$animName} $animDuration ease-out forwards;
            
            @keyframes #{$animName} {
              to { @include pxl-transform($transl $animTransf); }
            }
          }
        }        
      }
    }
  }

  //
  // PxlLogo rules
  .scene {
    @include pxl-perspective(800px);
    @include pxl-perspective-origin(center center);
    margin: 0 auto;
    width: $dim;
    height: $dim;
  }

  .pxlcube {
    position: relative;
    overflow: visible !important;
    @include pxl-transform-style(preserve-3d);
    @include pxl-transform-origin(center);
    width: $dim;
    height: $dim;
    @include pxl-transform(translate3d($dim/2-$cube-dim/2, $dim/2-$cube-dim/2,$cube-dim/2) rotateX(-45deg) rotateY(-45deg));

    .cube {
      position: absolute;
    }

    @include make-cube-anim-steps();

  }
</style>
