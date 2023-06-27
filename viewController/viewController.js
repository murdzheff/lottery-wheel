class ViewController {
    constructor() {
        this.wheel = document.getElementById("wheel");
        this.spinBtn = document.getElementById("spinBtn");
        this.totalHeading = document.getElementById("total")
        this.wheelLogic = wheelLogic;
        this.lastPriceIndex = 0;

        //spin btn functionality
        this.spinBtn.onclick = () => {
            this.spin()
                .then(() => {
                    if (this.lastPriceIndex === 18) {
                        this.spinThreeTimes();
                    }
                })


        }


        //create a map that connects the value that is coming from the model
        //to the elements in the wheel
        this.createMap = () => {
            const map = {};
            let ceil = 18;

            for (let i = 1; i < 19; i++) {
                if (i === 1) {
                    map[i] = 1;
                } else {
                    map[i] = ceil
                    ceil--
                }
            }

            return map;

        }

        this.map = this.createMap();





        this.populate();
    }



    //spin once (wheel returns to default position afterwards)
    async spin() {

        this.totalHeading.style.display = "none"

        const randomSector = this.wheelLogic.getRandomNumber();


        return await new Promise((resolve) => {
            this.spinBtn.disabled = true;
            this.wheel.style.transition = "transform 4s ease"
            this.wheel.style.transform = `rotate(${randomSector * 20 + 360}deg)`;
            setTimeout(() => {
                this.lastPrice = this.wheel
                    .children[this.map[randomSector] - 1]
                    .innerHTML.split(" ")[1]
                
                resolve(this.lastPrice);
            }, 6000);
        })
            .then((res) => {
                this.lastPriceIndex = randomSector;
                this.wheel.style.transition = "transform 2s ease"
                this.wheel.style.transform = `rotate(0)`;

                this.spinBtn.disabled = false;

                return res
            })





    }

    //populate the wheel with random values and set colors
    populate = () => {

        let random = Math.ceil(Math.random() * 55);

        for (let i = 1; i <= 18; i++) {



            const sector = document.createElement("div");
            sector.innerHTML = i === 2 ? `<span>Free Spins</span>` : `<span> $${i * random} </span>`;
            sector.className = "sector";
            sector.style.backgroundColor = this.getRandomBackgroundColor();
            sector.style.setProperty("--i", `${i}`)
            this.wheel.appendChild(sector);
        }
    }

    //free spins
    async spinThreeTimes() {
        await (async () => {
            for (let i = 0; i < 3; i++) {
                party.confetti(document.body, {
                    count: party.variation.range(40, 200),
                });
                const result = await this.spin();


                Number(result) !== "NaN" ? this.wheelLogic.spins.push(result.slice(1)) : null
                
            }
        })();


        if (this.wheelLogic.spins.length) {

            this.totalHeading.style.display = "flex";
            this.wheelLogic.spins ? (this.totalHeading.textContent = `Total: $${this.wheelLogic.calculateTotal()}!!!`) : null;
        

        }

        this.wheelLogic.spins = [];

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
