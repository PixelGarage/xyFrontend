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
      <div class="col col-12 col-md-9 col-lg-6">
        <form>
          <p class="legend">Input Text-Elemente</p>
          <input type="date" placeholder="00.11.2222" value="2222-11-01">
          <input type="datetime" placeholder="00.11.2222">
          <input type="datetime-local" placeholder="Placeholder">
          <input type="email" placeholder="name@domain.ch">
          <input type="month" placeholder="Januar, 2019" value="Januar-2019">
          <input type="number" placeholder="00">
          <input type="password" placeholder="Password">
          <input type="search" placeholder="Suche">
          <input type="tel" placeholder="+41 079 179 79 79">
          <input type="text" placeholder="Text">
          <input type="time" placeholder="12:00">
          <input type="url" placeholder="https://schaetti-lehmann.ch">
          <input type="week" placeholder="Woche 52">
          <textarea></textarea>
          <p class="legend">Checkbox</p>
          <label class="checkbox-container">Option A
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-container">Option B
            <input type="checkbox" checked>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-container">Option C
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <p class="legend">Radio</p>
          <label class="radio-container">Option 1
            <input type="radio" name="num-option">
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Option 2
            <input type="radio" name="num-option" checked>
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Option 3
            <input type="radio" name="num-option">
            <span class="checkmark"></span>
          </label>
          <p class="legend">Select</p>
          <div class="select-container">
            <select>
              <option value="0">Select Option …</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 2</option>
              <option value="4">Option 3</option>
            </select>
          </div>
          <p class="legend">Button</p>
          <input type="button" value="Button">
          <p class="legend">Submit</p>
          <input type="submit" value="Senden">
          <p class="legend">Reset</p>
          <input type="reset">
          <p class="legend">Button Weiter</p>
          <span class="button-more">Weiter</span>
          <p class="legend">Range</p>
          <input type="range">
        </form>
      </div>
    </div>
  </b-container>
</template>
