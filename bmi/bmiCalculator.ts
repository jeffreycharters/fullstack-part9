interface bmiData {
  mass: number;
  height: number;
}

const parseArguments = (args: Array<string>): bmiData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      mass: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (m: number, h: number) => {
  const bmi = m / (h * h) * 703
  if (bmi < 15) return 'Very severely underweight'
  if (bmi >= 15 && bmi < 16) return 'Severely underweight'
  if (bmi >= 16 && bmi < 18.5) return 'Underweight'
  if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 30) return 'Overweight'
  if (bmi >= 30 && bmi < 35) return 'Obese Class I (Moderately obese)'
  if (bmi >= 35 && bmi < 40) return 'Obese Class II (Severely obese)'
  if (bmi >= 40) return 'Obese Class III (Very severely obese)'
}

try {
  const { mass, height } = parseArguments(process.argv)
  console.log(calculateBmi(mass, height))
} catch (e) {
  console.log(`Something blew up, message: ${e.message}`)
}