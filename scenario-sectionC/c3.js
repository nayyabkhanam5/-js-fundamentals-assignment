// ============================================================
// C3 - Student Grade Management System — Report Generator
// Concepts: ALL concepts combined
// ============================================================

// Original students data — we must NOT modify this array
const students = [
  { name: 'Asad',   scores: [85, 90, 78, 92],      present: true  },
  { name: 'Sara',   scores: [70, 65, '80', 75],     present: true  },  // '80' is a string
  { name: 'Ali',    scores: [55, 60, 50, null],      present: false },  // null score
  { name: 'Fatima', scores: [95, 98, 100, 92],       present: true  },
  { name: 'Umar',   scores: [],                      present: true  },  // no scores
];


// ============================================================
// FUNCTION 1: getAverage(scores)
// Pure function — no side effects, no mutation
// ============================================================

function getAverage(scores) {

  // If the scores array is empty, return 0 right away
  if (scores.length === 0) {
    return 0;
  }

  // Filter out any invalid scores (null, undefined, or values that can't become numbers)
  // We use typeof and Number() as required (no parseInt or parseFloat)
  const validScores = scores.filter(function(score) {
    if (score === null || score === undefined) {
      return false; // skip nulls and undefined values
    }
    const asNumber = Number(score); // coerce string scores like '80' to 80
    return !isNaN(asNumber);        // keep only values that convert to valid numbers
  });

  // If all scores were invalid, return 0
  if (validScores.length === 0) {
    return 0;
  }

  // Convert all valid scores to numbers and sum them up
  // reduce() goes through each item and accumulates a total
  const total = validScores.reduce(function(sum, score) {
    return sum + Number(score); // Number() handles string scores like '80'
  }, 0); // starting value is 0

  // Calculate average and round to 1 decimal place
  const average = total / validScores.length;
  return Number(average.toFixed(1));
}


// ============================================================
// FUNCTION 2: getGrade(average)
// Pure function — converts a number average to a letter grade
// ============================================================

function getGrade(average) {
  if (average >= 90) return 'A+';
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F'; // below 50
}


// ============================================================
// FUNCTION 3: generateReport(students)
// Returns a NEW array of report objects — students array is NOT mutated
// ============================================================

function generateReport(students) {

  // map() creates a NEW array by transforming each student
  // The original 'students' array is never touched
  return students.map(function(student) {

    const average = getAverage(student.scores);   // calculate average (handles nulls + strings)
    const grade = getGrade(average);               // get letter grade
    const status = student.present ? 'present' : 'absent'; // ternary operator for status

    // A student PASSES only if:
    // - their average is 60 or above (passing grade)
    // - AND they were present
    const passed = average >= 60 && student.present;

    // Return a NEW report object for this student
    // We do NOT include or modify anything from the original student object
    return {
      name: student.name,
      average: average,
      grade: grade,
      status: status,
      passed: passed
    };
  });
}


// ============================================================
// FUNCTION 4: getSummary(report)
// Calculates overall class statistics from the report array
// ============================================================

function getSummary(report) {

  const total = report.length;

  // Count how many students passed
  const passed = report.filter(function(student) {
    return student.passed === true;
  }).length;

  const failed = total - passed;

  // Find the top student — the one with the highest average
  // reduce() compares each student and keeps the one with the higher average
  const topStudentReport = report.reduce(function(best, current) {
    return current.average > best.average ? current : best;
  });
  const topStudent = topStudentReport.name;

  // Calculate the class average (average of all students' averages)
  const totalAverage = report.reduce(function(sum, student) {
    return sum + student.average;
  }, 0);
  const classAverage = Number((totalAverage / total).toFixed(1));

  return {
    total: total,
    passed: passed,
    failed: failed,
    topStudent: topStudent,
    classAverage: classAverage
  };
}


// ============================================================
// RUN THE REPORT AND DISPLAY RESULTS
// ============================================================

// Save the original students array state for comparison later
const studentsBeforeReport = JSON.stringify(students); // convert to string to compare later

const report = generateReport(students);
const summary = getSummary(report);

console.log('============================================================');
console.log('STUDENT REPORT');
console.log('============================================================');

report.forEach(function(student) {
  console.log(
    student.name + ': ' +
    'avg=' + student.average + ', ' +
    'grade=' + student.grade + ', ' +
    'status=' + student.status + ', ' +
    'passed=' + student.passed
  );
});

console.log('\n============================================================');
console.log('CLASS SUMMARY');
console.log('============================================================');
console.log(summary);

// ============================================================
// PROVE: students array is unchanged after generateReport
// ============================================================

console.log('\n============================================================');
console.log('PROOF: original students array is unchanged');
console.log('============================================================');

const studentsAfterReport = JSON.stringify(students);

if (studentsBeforeReport === studentsAfterReport) {
  console.log('✓ students array is UNCHANGED — generateReport is a pure function!');
} else {
  console.log('✗ students array was MUTATED — something went wrong!');
}

// Also show the original array to visually confirm
console.log('\nOriginal students array:');
console.log(students);