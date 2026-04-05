let randomNum; 
// declaring the randomNum so we can use it in our script

document.getElementById("generate-btn").addEventListener("click", randomNumberGenerator)
// random number generator btn

document.getElementById("translate-btn").addEventListener("click", translatorNumberToFrench)
// trasnlate btn

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
    else{ 
        return units[number]
    }
}

// generates the random number and displays it 
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
    document.getElementById("number-display").textContent = randomNum
    document.getElementById("french-display").textContent = ""
    }
}

// translates the number to french and displays it
function translatorNumberToFrench(){
    if(randomNum === undefined){
        alert("Firstly generate a random number!")
    }
    else{
    const translatedNum = numberToFrench(randomNum)
    document.getElementById("french-display").textContent = translatedNum
    }
}