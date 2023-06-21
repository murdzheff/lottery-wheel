class WheelLogic {

    constructor() {
        this.lastNumber = null;
        this.set = [];
        this.spins = [];
        this.populateSet();

    }


    //calculating the total value for the free three spins
    calculateTotal() {
        this.spins = this.spins.map(e => Number(e)); // Assign the mapped array back to this.spins
      
        const calculated = this.spins.reduce((prev, curr) => {
          return prev + curr;
        }, 0);
      
        return calculated;
      }
      
      /*populating the array with 3 times "3" and 2 times "six", 
      can be changed to random numbers too, so on each population we can have different identical values*/
    populateSet() {
        this.set = []

        let countThree = 0;
        let countSix = 0;

        while (countSix < 2) {
            this.set.push(6);
            countSix++;
        }

        while (countThree < 3) {
            this.set.push(3)
            countThree++;
        }

        for (let i = 0; i < 5; i++) {
            this.set.push(Math.ceil(Math.random() * 17))
        }

    }

    //function to check if the remaining set is comprised of only identical numbers
    checkIdentical(array) {
        if (array.length === 0) {
            return true;
        }

        const firstNum = array[0];

        for (let i = 1; i < array.length; i++) {
            if (array[i] !== firstNum) {
                return false;
            }
        }

        return true;
    }


    //take random number from the array making sure that the previous number is not == to the next one
    getRandomNumber() {
        let randomNumber = Math.round(Math.random() * (this.set.length - 1));

        let curr = this.set[randomNumber];

        if (this.set.length === 0 || this.checkIdentical(this.set)) {
            this.populateSet();
            this.lastNumber = null;
            return curr
        }

        if (
            (curr !== this.lastNumber) ||
            (curr !== this.lastNumber)
        ) {


            this.set.splice(randomNumber, 1);

            if (!this.set.length) {
                this.lastNumber = null;
                this.populateSet();
                console.log(this.set)
            }

            this.lastNumber = curr;
            return curr;
        }

        if (curr === this.lastNumber) {
            return this.getRandomNumber();
        }


    }

}






const wheelLogic = new WheelLogic();