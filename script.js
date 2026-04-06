let randomNum; 
// declaring the randomNum so we can use it in our script
let mode = "numberToFrench";
// declaring this variable so we know which tab we are using

document.getElementById("generate-btn").addEventListener("click", randomNumberGenerator)
// random number generator btn

document.getElementById("translate-btn").addEventListener("click", translatorNumberToFrench)
// trasnlate btn

document.getElementById("tab-num-to-french").addEventListener("click", setNumberToFrench)
document.getElementById("tab-french-to-num").addEventListener("click", setFrenchToNumber)
// reads the mode 


/* these two functions change the tabs between
numberToFrench and frenchToNumber
*/
function setNumberToFrench(){
    mode = "numberToFrench"
    document.getElementById("tab-num-to-french").classList.add("active")
    document.getElementById("tab-french-to-num").classList.remove("active")
    document.getElementById("top-display").textContent = ""
    document.getElementById("bottom-display").textContent = ""
}
function setFrenchToNumber(){
    mode = "FrenchToNumber"
    document.getElementById("tab-french-to-num").classList.add("active")
    document.getElementById("tab-num-to-french").classList.remove("active")
    document.getElementById("top-display").textContent = ""
    document.getElementById("bottom-display").textContent = ""
}

function numberToFrench(number){
    /* arrays for the numbers in french
    units is about the numbers from 0-16 and 
    tens if for numbers 20-30-40-50-60  
    */
    const units = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
         "onze", "douze", "treize", "quatorze", "quinze", "seize"];
    const tens = ["vingt", "trente", "quarante", "cinquante", "soixante"]

    // for numbers between 17 and 19 in, french are formed like 10 +7, 10 + 8, 10 + 9
    if(number >= 17 && number <20){
        const output = units[10] + "-" + units[number-10]
        return output
    }

    /* for numbers between 20 and 69, they are formed like 20 + 1, 20 + 2, 30 + 1, 30 + 2, etc.
     but if the second digit is zero then we just return the first part
    */
   else if (number >= 20 && number < 70) {
        const first_digit = Math.floor(number / 10)
        const second_digit = number % 10
        if (second_digit == 0){
            const output = tens[first_digit - 2]
            return output
        }
        else if(second_digit == 1){
            // in french, numbers ending in 1 (21, 31, 41, 51, 61) use "et" before "un"
            const output = tens[first_digit -2] + "-" + "et" + "-" + "un"
            return output
        }
        else{
            const output = tens[first_digit - 2] + "-" + units[second_digit]
            return output 
        }
    }

    // for numbers between 70 and 79, they are formed like 60 + 10, 60 + 11, 60 + 12, etc. 
    else if (number >= 70 && number < 80){
        const first_digit = number - 60
        const second_digit = number % 10
        if(second_digit == 1){
            // 71 is a special case, it uses "et" like the other numbers ending in 1
            const output = tens[4] + "-" + "et" + "-" + "onze"
            return output
        }
        else{
            const recursionFrenchNum = numberToFrench(first_digit) // recoursion 
            const output = tens[4] + "-" + recursionFrenchNum
            return output
        }
    }

    // for numbers between 80 and 99, they are formed like 4 x 20, 4 x 20 + 1, 4 x 20 + 2, etc.
    else if (number >= 80 && number < 100){
        const digit = number - 80
        if (number == 80){
            // 80 is the only one that gets an "s" at the end (quatre-vingts)
            const output = units[4] + "-" + tens[0] + "s"
            return output
        }
        else{
            const recursionFrenchNum = numberToFrench(digit) // here we are using recursion because we already have 
            const output = units[4] + "-" + tens[0] + "-" + recursionFrenchNum // the function that converts numbers
            return output
        }
    }
    
    
    else if(number >= 100 && number < 1000){
        const hunders_digit =  Math.floor(number / 100) // finding the hundreds digit
        const else_digits = number % 100 // rest digits 
        if(hunders_digit == 1){ // about the numbers between 100-199
            if(else_digits == 0){ // for number 100
                const output = "cent"
                return output
            }
            else{ // for numbers between 101-199
                const output = "cent" + "-" + numberToFrench(else_digits)
                return output
            }
        }
        else{ // for numbers 200-999
            if(else_digits == 0){ // for 200,300,400,...,900
                const output = units[hunders_digit] + "-" + "cents"
                return output
            }
            else{ // rest 
                const output = units[hunders_digit] + "-" + "cent" + "-" + numberToFrench(else_digits)
                return output
            }
        }
    }
    else{                       // for numbers 0-16 we just return the unit directly from the array
        return units[number]
    }
}

/* generates a random number within the min-max range
and displays it on the top display, what we show depends on the mode
numberToFrench: shows the number on top
FrenchToNumber: shows the french word on top
*/
function randomNumberGenerator(){
    var minNum = parseInt(document.getElementById("min-range").value) 
    var maxNum = parseInt(document.getElementById("max-range").value)
    // get the min-max numbers for the range filter

    if(minNum > maxNum){
        alert("Min. Number shouldn't be greater than Max Number!")
    }
    else{
    const range = maxNum - minNum
    randomNum = Math.floor(Math.random() * range) + minNum
    if(mode==="numberToFrench"){
        document.getElementById("top-display").textContent = randomNum
        document.getElementById("bottom-display").textContent = ""
    }
    else{
        document.getElementById("bottom-display").textContent = ""
        document.getElementById("top-display").textContent = numberToFrench(randomNum)
    }
    }
}

/* reveals the answer on the bottom display
numberToFrench: shows the french translation
FrenchToNumber: shows the actual number
*/
function translatorNumberToFrench(){
    if(randomNum === undefined){
        alert("Firstly generate a random number!")
    }
    else{
        if(mode==="numberToFrench"){
            const translatedNum = numberToFrench(randomNum)
            document.getElementById("bottom-display").textContent = translatedNum
        }
        else{
            document.getElementById("bottom-display").textContent = randomNum
        }
    }
}