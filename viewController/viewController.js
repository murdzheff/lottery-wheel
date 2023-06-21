class ViewController {
    constructor() {
        this.container = document.querySelector('.wheel-container');
        this.spinButton = document.getElementById("spin");
        this.wheel = new spinWheel.Wheel(this.container, this.props);
        this.wheelLogic = wheelLogic;
        this.totalHeading = document.getElementById("total")
        this.wheel.radius = 1;
        

        //wheel styling
        this.wheel.items.map(e => {
            e.backgroundColor = this.getRandomBackgroundColor();
            e.labelColor = "white"
        })

        this.wheel.items[17].weight = 2
        this.wheel.borderWidth = 5;
        this.wheel.borderColor = "#FFFF";


        //events
        this.spinButton.onclick = (e) => {
            e.preventDefault()
            this.totalHeading.textContent = "";
            this.totalHeading.style.display = "none";
            this.spin()
            
        }


        this.wheel.onRest = (e) => {

            if (e.currentIndex === 17) {


                this.delayedLoop();
            }
        }
    }




    /* functions for the three free spins, adding a delay before each spin and finally showing the total prize won */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async delayedLoop() {
        this.spinButton.disabled = true;

        

        for (let i = 0; i <= 3; i++) {
            const currentIndex = this.wheel.getCurrentIndex();
            const prize = this.wheel.items[currentIndex]._label;
            


            if (prize !== "  3 Free spins") {
                this.wheelLogic.spins.push(prize);
            }

            if (i < 3) {


                party.confetti(document.body, {
                    count: party.variation.range(40, 200),
                });
                this.spin()




            } else if (currentIndex !== 17) {
                this.totalHeading.style.display = "flex";
                this.wheelLogic.spins ? this.totalHeading.textContent = `Total: ${this.wheelLogic.calculateTotal()}!!!` : null;
                this.wheelLogic.spins = [];
                
            }

            await this.delay(5000);
        }


        this.spinButton.disabled = false;

    }



    //function that spins the wheel either on button click or when having free spins
    spin() {
        const randomSector = this.wheelLogic.getRandomNumber();
        this.wheel.spinToItem(randomSector, 4000, true, 2, 1)
    }

    //generating a different wheel on every reload
    generateSectors() {
        let arr = []
        let randomizer = Math.floor(Math.random() * 5) || 2

        for (let i = 1; i < 18; i++) {
            arr.push(
                {
                    label: `${i * 100 * randomizer}`
                }
            )
        }

        arr.push({ label: "  3 Free spins" })

        return arr;
    }

    props = {
        items: this.generateSectors()
    }


    //little function to randomize the colors of every sector
    getRandomBackgroundColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

}


const viewController = new ViewController();

const duration = 4000;