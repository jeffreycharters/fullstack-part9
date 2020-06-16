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
  let message = ''
  if (bmi < 15) message = 'Very severely underweight'
  if (bmi >= 15 && bmi < 16) message = 'Severely underweight'
  if (bmi >= 16 && bmi < 18.5) message = 'Underweight'
  if (bmi >= 18.5 && bmi < 25) message = 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 30) message = 'Overweight'
  if (bmi >= 30 && bmi < 35) message = 'Obese Class I (Moderately obese)'
  if (bmi >= 35 && bmi < 40) message = 'Obese Class II (Severely obese)'
  if (bmi >= 40) message = 'Obese Class III (Very severely obese)'
  return {
    weight: m,
    height: h,
    bmi: message
  }
}

try {
  const { mass, height } = parseArguments(process.argv)
  console.log(calculateBmi(mass, height))
} catch (e) {
  console.log(`Something blew up, message: ${e.message}`)
}

export default calculateBmi;