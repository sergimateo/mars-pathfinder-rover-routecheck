<template>
  <div id="app">
    <div id="bg">
      <img src="./assets/1341_pathfinder20160226-16.jpg" alt="" />
    </div>
    <img
      alt="Pathfinder logo"
      src="./assets/Mars_Pathfinder_Insignia_large.png"
      height="100px"
    />
    <div id="block" class="d-flex flex-column my-2">
      <div id="title" class="d-flex flex-column">
        <h1>Sojourner Route Validation Test</h1>
      </div>
      <div v-if="showTest" class="d-flex flex-column my-2">
        <div id="initial text" class="d-flex flex-column my-3">
          <h2 class="text-center">Initial Values</h2>
        </div>
        <div id="gridsize" class="d-flex flex-column my-2">
          <h4 class="text-center">Set Squared Grid Size</h4>
          <div class="d-flex col-1 mx-auto my-2">
            <b-form-input
              type="number"
              id="gridSize"
              min="0"
              step="1"
              class="form-control"
              v-model.number="gridSize"
            >
            </b-form-input>
          </div>
        </div>
        <div id="xposypos" class="d-flex justify-content-center">
          <div class="form-group col-1 param mx-1">
            <label for="xVal">X Value</label>
            <b-form-input
              type="number"
              id="xVal"
              min="0"
              step="1"
              class="form-control"
              v-model.number="initVals.xVal"
            >
            </b-form-input>
          </div>

          <div class="form-group col-1 param mx-1">
            <label for="yVal">Y Value</label>
            <b-form-input
              id="yVal"
              type="number"
              min="0"
              step="1"
              class="form-control"
              v-model.number="initVals.yVal"
            ></b-form-input>
          </div>
          <div class="form-group mx-3">
            <label for="orientation">Orientation</label>
            <select
              name="orientation"
              id="orientation"
              class="form-control"
              v-model="initVals.orientation"
            >
              <option value="N">N</option>
              <option value="E">E</option>
              <option value="S">S</option>
              <option value="W">W</option>
            </select>
          </div>
        </div>
        <div id="instext" class="d-flex flex-column my-2">
          <h2 class="text-center">Instructions Sequence</h2>
          <b-form-input
            class="mx-auto col-6"
            id="instructionsText"
            v-model="instructionsText"
            disabled
          ></b-form-input>
        </div>

        <div class="d-flex flex-column my-2">
          <b-button-toolbar
            class="d-flex justify-content-around flex-wrap mt-3 mx-auto"
          >
            <b-button
              variant="info"
              class="mt-2 mx-2 instruction-btn"
              @click="addInstruction('L')"
            >
              Turn left
            </b-button>
            <b-button
              variant="info"
              class="mt-2 mx-2 instruction-btn"
              @click="addInstruction('A')"
            >
              Advance
            </b-button>
            <b-button
              variant="info"
              class="mt-2 mx-2 instruction-btn"
              @click="addInstruction('R')"
            >
              Turn right
            </b-button>
            <b-button
              variant="danger"
              class="mt-2 mx-2 instruction-btn"
              @click="deleteInstructions"
            >
              Delete all
            </b-button>
          </b-button-toolbar>
          <div class="d-flex justify-content-center my-2">
            <b-button
              variant="success"
              class="mb-3 instruction-btn"
              @click="runInstructions"
            >
              Run test
            </b-button>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="routevalid">
          <div>Route {{ this.instructionsText }} Valid.</div>
          <div>Grid Square size: {{ gridSize }}</div>

          <div>
            End position: X Value = {{ currentVals.xVal }} | Y Value =
            {{ currentVals.yVal }} | Orientation: {{ currentVals.orientation }}
          </div>
        </div>
        <div v-if="routeinvalid">
          <div>Route {{ this.instructionsText }} Invalid...</div>
          <div>
            Sojourner left the grid map after executing instruction
            {{ this.instructionPointer - 1 }}
          </div>
        </div>
        <div class="d-flex justify-content-center my-2">
          <b-button variant="warning" class="mb-3" @click="restart">
            Restart?
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./Scripts/app.js"></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxanium&display=swap");

#app {
  font-family: Oxanium, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(255, 231, 13);
  margin-top: 10px;
}
#bg {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -1;
}
#bg img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
}
.instruction-btn {
  color: rgb(255, 231, 13);
}
</style>
