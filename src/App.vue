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
    <div class="my-3">
      <h1>Sojourner Route Validation Test</h1>
    </div>
    <div v-if="showTest">
      <div class="d-flex flex-column my-2">
        <h2 class="text-center">Set Squared Grid Size</h2>
        <div class="d-flex col-2 mx-auto my-2">
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
      <div class="d-flex flex-column my-2">
        <h2 class="text-center">Initial Values</h2>
        <div class="d-flex justify-content-center">
          <div class="form-group param mx-1">
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

          <div class="form-group param mx-1">
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
      </div>
      <div class="d-flex flex-column my-2">
        <h2 class="text-center">Instructions Sequence</h2>
        <b-form-input
          class="mx-auto col-6"
          id="instructionsText"
          v-model="instructionsText"
          disabled
        ></b-form-input>
      </div>
      <div>
        <div class="d-flex justify-content-around flex-wrap mt-3 mx-auto">
          <b-button
            variant="info"
            class="mt-2 mx-2"
            @click="addInstruction('L')"
          >
            Turn left
          </b-button>
          <b-button
            variant="info"
            class="mt-2 mx-2"
            @click="addInstruction('A')"
          >
            Advance
          </b-button>
          <b-button
            variant="info"
            class="mt-2 mx-2"
            @click="addInstruction('R')"
          >
            Turn right
          </b-button>
          <b-button
            variant="danger"
            class="mt-2 mx-2"
            @click="deleteInstructions"
          >
            Delete all
          </b-button>

          <div class="d-flex justify-content-center my-2">
            <b-button variant="success" class="mb-3" @click="runInstructions">
              Run test
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="routevalid">
        <div>Route {{ this.instructionsText }} Valid.</div>
        <div>Grid Square size: {{ gridSize }}</div>
        <div>Start position: {{ initVals }}</div>
        <div>End position {{ currentVals }}</div>
      </div>
      <div v-if="routeinvalid">
        Route {{ this.instructionsText }} Invalid at instruction number
        {{ this.instructionPointer }}
      </div>
      <div class="d-flex justify-content-center my-2">
        <b-button variant="warning" class="mb-3" @click="restart">
          Restart?
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // text: "",
      compass: ["N", "E", "S", "W"],
      gridSize: 0,

      initVals: {
        xVal: 0,
        yVal: 0,
        orientation: "N",
      },
      currentVals: {},

      instructionsText: "",

      instructionsArray: [],
      instructionPointer: 0,
      routeinvalid: 0,
      routevalid: 0,
      showTest: true,
    };
  },
  components: {},

  methods: {
    restart() {
      this.instructionsText = "";
      this.instructionsArray = [];
      this.instructionPointer = 0;
      this.routeinvalid = 0;
      this.routevalid = 0;
      this.showTest = !this.showTest;
      this.currentVals = {};
    },
    addInstruction(instruction) {
      this.instructionsText += instruction;
      this.instructionsArray.push(instruction);
    },
    deleteInstructions() {
      this.instructionsText = "";
      this.instructionsArray = [];
    },
    runInstructions() {
      // window.alert(
      //   "Grid Size: " +
      //     this.gridSize +
      //     ". Initial Values: " +
      //     this.initVals.xVal +
      //     " " +
      //     this.initVals.yVal +
      //     " " +
      //     this.initVals.orientation +
      //     ". Run Instruction Set: " +
      //     this.instructionsText +
      //     this.instructionsArray
      // );
      this.showTest = !this.showTest;
      // this.instructionPointer = 0;
      // this.routeinvalid = 0;
      // this.routevalid = 0;

      this.currentVals = this.initVals;
      // this.tempVals = this.initVals;
      // this.currentVals = this.tempVals;
      this.routeValidation();
    },
    routeValidation() {
      if (this.isInsideGrid()) {
        let maxCount = this.instructionsArray.length;
        let i = this.instructionPointer;

        // console.log(maxCount);

        if (i < maxCount) {
          this.updateCurrentVals(i);
          this.instructionPointer++;
          console.log("number of instructions" + this.instructionPointer);
          this.routeValidation();
        } else {
          //  after running last instruction
          //  check isInsidegrid
          if (this.isInsideGrid()) {
            this.routeinvalid = 0;
            this.routevalid = 1;
            // this.clearInits();
          } else {
            this.routevalid = 0;
            this.routeinvalid = 1;
          }
          //           if true
          //
          // else
          //           this.routevalid = 0;
          //           this.routeinvalid = 1;
        }
      } else {
        this.routevalid = 0;
        this.routeinvalid = 1;
      }

      // window.alert("Route Validating");
    },

    isInsideGrid() {
      let insideX = this.gridSize - this.initVals.xVal;
      let insideY = this.gridSize - this.initVals.yVal;
      if (
        this.initVals.xVal > -1 &&
        this.initVals.yVal > -1 &&
        insideX > -1 &&
        insideY > -1
      ) {
        return 1;
      } else {
        return 0;
      }
    },
    updateCurrentVals(i) {
      let currentInstruction = this.instructionsArray[i];
      // let newOrientation = "";
      let orientationCompassIndex = this.compass.indexOf(
        this.currentVals.orientation
      );
      switch (currentInstruction) {
        case "L":
          console.log("CASE L:" + currentInstruction);
          console.log(this.currentVals.orientation);

          if (this.currentVals.orientation == "N") {
            this.currentVals.orientation = "W";
          } else {
            this.currentVals.orientation = this.compass[
              orientationCompassIndex - 1
            ];
          }

          console.log(this.currentVals.orientation);

          break;
        case "R":
          console.log("CASE R:" + currentInstruction);
          // console.log("CASE L:" + currentInstruction);
          console.log(this.currentVals.orientation);

          if (this.currentVals.orientation == "W") {
            this.currentVals.orientation = "N";
          } else {
            this.currentVals.orientation = this.compass[
              orientationCompassIndex + 1
            ];
          }

          console.log(this.currentVals.orientation); //  do sthing
          break;
        case "A":
          console.log("CASE A:" + currentInstruction);

          switch (this.currentVals.orientation) {
            case "N":
              this.currentVals.yVal += 1;
              break;
            case "E":
              this.currentVals.xVal += 1;
              break;
            case "S":
              this.currentVals.yVal -= 1;
              break;
            case "W":
              this.currentVals.xVal -= 1;
              break;
          }
          //  do sthing
          break;
      }
    },
    // clearInits() {
    //   this.initVals = {
    //     xVal: 0,
    //     yVal: 0,
    //     orientation: "N",
    //   };
    //   // instructionsText: "",
    //   this.instructionsArray = [];
    //   this.instructionPointer = 0;
    //   this.gridSize = 0;
    // },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxanium&display=swap");
#app {
  font-family: Oxanium, Computer, Avenir, Helvetica, Arial, sans-serif;
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
</style>
