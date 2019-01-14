<template>
  <div class="cube" @animationend="onAnimationEnd">
    <div class="cube-inner">
      <div class="cube-face cube-face-front">front</div>
      <div class="cube-face cube-face-back">back</div>
      <div class="cube-face cube-face-left">left</div>
      <div class="cube-face cube-face-right">right</div>
      <div class="cube-face cube-face-top">top</div>
      <div class="cube-face cube-face-bottom">bottom</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addClasses: function(classes) {
      for (let className of classes) {
        this.$el.classList.add(className);
      }
    },
    updateCubeAttrs: function (step, cubeAttr, strRot) {
      const xyz = cubeAttr.split('-').pop().split('');
      let newAttr = 'cube-';
      if (this.$el.classList.contains('left') || this.$el.classList.contains('right')) {
        newAttr += this.$el.classList.contains('left') ? 'l' : 'r';
      } else {
        newAttr += xyz[0];
      }
      if (this.$el.classList.contains('top') || this.$el.classList.contains('bottom')) {
        newAttr += this.$el.classList.contains('top') ? 't' : 'b';
      } else {
        newAttr += xyz[1];
      }
      if (this.$el.classList.contains('back') || this.$el.classList.contains('front')) {
        newAttr += this.$el.classList.contains('back') ? 'b' : 'f';
      } else {
        newAttr += xyz[2];
      }
      // update rotation on cube-inner
      const ciEl = this.$el.querySelector('.cube-inner');
      let ciTransf = ciEl.style.transform;
      ciEl.style.transform = strRot + ' ' + ciTransf;

      // replace attribute
      this.$el.classList.remove(step);
      this.$el.setAttribute(newAttr, '');
      this.$el.removeAttribute(cubeAttr);
    },
    // IE doesn' support replace() and multiple arguments in add() remove()
    rotX90: function(times, step, cubeAttr) {
      // left right classes constant
      let classes = [];
      for (let i = 0; i < times; i++) {
        if (this.$el.classList.contains('top')) { classes.push('back'); this.$el.classList.remove('top'); }
        if (this.$el.classList.contains('back')) { classes.push('bottom'); this.$el.classList.remove('back'); }
        if (this.$el.classList.contains('bottom')) { classes.push('front'); this.$el.classList.remove('bottom'); }
        if (this.$el.classList.contains('front')) { classes.push('top'); this.$el.classList.remove('front'); }
        this.addClasses(classes);
        classes = [];
      }
      // replace cube attribute
      const deg = times*90;
      const rot = `rotate3d(1, 0, 0, ${deg}deg)`;
      this.updateCubeAttrs(step, cubeAttr, rot);
    },
    rotY90: function(times, step, cubeAttr) {
      // top bottom classes constant
      let classes = [];
      for (let i = 0; i < times; i++) {
        if (this.$el.classList.contains('front')) { classes.push('right'); this.$el.classList.remove('front'); }
        if (this.$el.classList.contains('right')) { classes.push('back'); this.$el.classList.remove('right'); }
        if (this.$el.classList.contains('back')) { classes.push('left'); this.$el.classList.remove('back'); }
        if (this.$el.classList.contains('left')) { classes.push('front'); this.$el.classList.remove('left'); }
        this.addClasses(classes);
        classes = [];
      }
      // replace cube attribute
      const deg = times*90;
      const rot = `rotate3d(0, 1, 0, ${deg}deg)`;
      this.updateCubeAttrs(step, cubeAttr, rot);
    },
    rotZ90: function(times, step, cubeAttr) {
      // front back classes constant
      let classes = [];
      for (let i = 0; i < times; i++) {
        if (this.$el.classList.contains('top')) { classes.push('right'); this.$el.classList.remove('top'); }
        if (this.$el.classList.contains('right')) { classes.push('bottom'); this.$el.classList.remove('right'); }
        if (this.$el.classList.contains('bottom')) { classes.push('left'); this.$el.classList.remove('bottom'); }
        if (this.$el.classList.contains('left')) { classes.push('top'); this.$el.classList.remove('left'); }
        this.addClasses(classes);
        classes = [];
      }
      // replace cube attribute
      const deg = times*90;
      const rot = `rotate3d(0, 0, 1, ${deg}deg)`;
      this.updateCubeAttrs(step, cubeAttr, rot);
    },
    onAnimationEnd: function(event) {
      //
      // update position classes of all involved cubes according to the given animation
      const splitter = event.animationName.split('__');
      const step = splitter.shift();
      const turn = splitter.shift();
      const cubeAttr = 'cube-' + splitter.shift().split('-data').shift();
      switch (turn) {
        case 'front-90':
        case 'back-90':
          this.rotZ90(1, step, cubeAttr);
          break;
        case 'front-180':
        case 'back-180':
          this.rotZ90(2, step, cubeAttr);
          break;
        case 'front-270':
        case 'back-270':
          this.rotZ90(3, step, cubeAttr);
          break;
        case 'left-90':
        case 'right-90':
          this.rotX90(1, step, cubeAttr);
          break;
        case 'left-180':
        case 'right-180':
          this.rotX90(2, step, cubeAttr);
          break;
        case 'left-270':
        case 'right-270':
          this.rotX90(3, step, cubeAttr);
          break;
        case 'top-90':
        case 'bottom-90':
          this.rotY90(1, step, cubeAttr);
          break;
        case 'top-180':
        case 'bottom-180':
          this.rotY90(2, step, cubeAttr);
          break;
        case 'top-270':
        case 'bottom-270':
          this.rotY90(3, step, cubeAttr);
          break;
      }
    },
  }
}
</script>


<style lang="scss" scoped>
/*
 *  Cube section 
 * --------------------------------------------------*/
  @import '~/assets/scss/custom.scss';

  //
  // local variables
  $dim: 100px;
  $primary-color: $black;
  $secondary-color: $white;
  $text-color: transparent;
  $opacity: 1;

  $face-positions: (
    'face-front': translateZ(50px) rotateY(0deg),
    'face-back':  translateZ(-50px) rotateY(180deg),
    'face-left':  translateX(-50px) rotateY(-90deg),
    'face-right': translateX(50px) rotateY(90deg),
    'face-top':   translateY(-50px) rotateX(90deg),
    'face-bottom':translateY(50px) rotateX(-90deg)
  );

  //
  // local mixin
  @mixin make-cube-faces ($faces: $face-positions) {
    @each $face, $transf in $faces {
      .cube-#{$face} {
        .cube[#{$face}] & {
          background-color: $secondary-color;
        }
        @include pxl-transform($transf); 
      }
    }
  }

  .cube {
    @include pxl-transform-style(preserve-3d);
  }

  .cube-inner {
    position: relative;
    overflow: visible !important;
    @include pxl-transform-style(preserve-3d);
    @include pxl-transform-origin(center);
    width: $dim;
    height: $dim;
  }

  .cube-face {
    @include pxl-backface-visibility(hidden);
    .cube[backface-visible] & {
      @include pxl-backface-visibility(visible);
    }
    position: absolute;
    width: $dim;
    height: $dim;
    text-align: center;
    line-height: $dim;
    color: $text-color;
    border: 0.02rem solid $gray-600;
    background-color: $primary-color;
    opacity: $opacity;
  }

  //
  // create all cube face rules
  @include make-cube-faces();

</style>
