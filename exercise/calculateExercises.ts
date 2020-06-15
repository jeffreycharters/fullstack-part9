interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  target: number;
  hours: Array<number>;
}

type trainingWeek = Array<string>


const parseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2])
  if (isNaN(target)) {
    throw new Error('Target value is not a number.')
  }
  const stringHours = args.slice(3)
  const hours = []

  for (let i = 0; i < stringHours.length; i++) {
    hours.push(Number(stringHours[i]))
    if (isNaN(hours[i])) {
      throw new Error('Provided hours were not all numbers!')
    }
  }

  return {
    target,
    hours
  }

}

const calculateExercise = (target: number, hours: Array<number>): Result => {
  const periodLength = hours.length


  let trainingDays = 0;
  let totalHours = 0;
  for (let i = 0; i < hours.length; i++) {
    totalHours += hours[i]
    if (hours[i] > 0) {
      trainingDays += 1;
    }
  }


  const average = totalHours / periodLength

  const success = average > target ? true : false

  let rating = 3
  let ratingDescription = 'target achieved!'
  if (average / target < 0.5) {
    rating = 1
    ratingDescription = 'hardly even tried'
  } else if (average / target < 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

// const dummyData = [3, 0, 2, 4.5, 0, 3, 1]

try {
  const { target, hours } = parseArguments(process.argv)
  console.log(calculateExercise(target, hours))
} catch (e) {
  console.log(`Error, something bad happened, message: ${e.message}`)
}
