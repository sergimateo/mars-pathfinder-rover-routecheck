export default {
  name: "App",
  data() {
    return {
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
  methods: {
    restart() {
      this.gridSize = 0;
      this.initVals = { xVal: 0, yVal: 0, orientation: "N" };
      this.currentVals = {};
      this.instructionsText = "";
      this.instructionsArray = [];
      this.instructionPointer = 0;
      this.routeinvalid = 0;
      this.routevalid = 0;
      this.showTest = true;
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
      this.showTest = !this.showTest;
      this.bufferedVals = this.initVals;
      this.currentVals = this.initVals;
      this.routeValidation();
    },
    routeValidation() {
      if (this.isInsideGrid()) {
        let maxCount = this.instructionsArray.length;
        let i = this.instructionPointer;
        if (i < maxCount) {
          this.updateCurrentVals(i);
          this.instructionPointer++;
          console.log("number of instructions" + this.instructionPointer);
          this.routeValidation();
        } else {
          if (this.isInsideGrid()) {
            this.routeinvalid = 0;
            this.routevalid = 1;
          } else {
            this.routevalid = 0;
            this.routeinvalid = 1;
          }
        }
      } else {
        this.routevalid = 0;
        this.routeinvalid = 1;
      }
    },

    isInsideGrid() {
      let insideX = this.gridSize - this.currentVals.xVal;
      let insideY = this.gridSize - this.currentVals.yVal;
      if (
        this.currentVals.xVal > -1 &&
        this.currentVals.yVal > -1 &&
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

      let orientationCompassIndex = this.compass.indexOf(
        this.currentVals.orientation
      );
      switch (currentInstruction) {
        case "L":
          //redo code with mod4 division
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
          //redo code with mod4 division

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
          break;
      }
    },
  },
};
