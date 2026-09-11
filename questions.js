// Question bank for the Christmas Story quiz/survey.
// Add more questions to QUESTION_BANK any time — the page always shows
// STATIC_QUESTION first, then picks 4 random ones from this array.
//
// Types:
//   "scale"          -> single choice, not graded (used for the static question)
//   "short-text"     -> free text input, graded against acceptedAnswers (case/space-insensitive)
//   "multiple-choice"-> single choice from options, graded against correctAnswer
//   "true-false"     -> same as multiple-choice with options ["True","False"]
//   "checkbox"       -> multiple choice from options, graded against correctAnswers (set match)
//
// question       -> plain-text version, used for the results payload sent to the sheet
// questionHtml   -> optional; only present when the source has inline formatting (e.g. <em>
//                    italics). When present, rendering uses this (via innerHTML) instead of
//                    the plain `question` field.
// reference      -> Bible reference for the correct answer, shown on the results page.

const STATIC_QUESTION = {
  id: "static-1",
  type: "scale",
  question: "How would you rate your knowledge of the Bible?",
  options: ["Strong", "Fairly strong", "Average", "Fairly weak", "Weak"]
};

const QUESTION_BANK = [
  {
    id: "q2",
    type: "short-text",
    question: "(Short answer) Where in the Bible so we find the story of Jesus’ birth? (Give book and chapter)",
    acceptedAnswers: [
      "Matthew 1-2", "Matt 1-2", "Matt. 1-2", "Matthew 1 and 2", "Matt 1 and 2", "Matt. 1 and 2", "Matthew 1 & 2", "Matt 1 & 2", "Matt. 1 & 2", "Matthew 2", "Matt 2", "Matt. 2", "Luke 1-2", "Lk 1-2", "Lk. 1-2", "Luke 1 and 2", "Lk 1 and 2", "Lk. 1 and 2", "Luke 1 & 2", "Lk 1 & 2", "Lk. 1 & 2", "Matthew 2 and Luke 1-2", "Matt 2 and Lk 1-2"
    ],
    reference: ""
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "(Select one) Where did Joseph and Mary live at the outset of the Christmas Story?",
    options: ["Jerusalem", "Sepphoris", "Nazareth", "Capernaum", "None of the above"],
    correctAnswer: "Nazareth",
    reference: "Luke 2:4"
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "(Select one) Where did Joseph and Mary go upon departing their home?",
    options: ["Hebron", "Bethlehem", "Joppa", "Bethel", "Jerusalem"],
    correctAnswer: "Bethlehem",
    reference: "Luke 2:4"
  },
  {
    id: "q5",
    type: "multiple-choice",
    question: "(Select one) What did Mary ride when she and Joseph made their first journey?",
    options: ["Horse", "Camel", "Donkey", "Cart", "Scripture doesn't say"],
    correctAnswer: "Scripture doesn't say",
    reference: "Luke 2:4"
  },
  {
    id: "q6",
    type: "true-false",
    question: "(T/F) Joseph wanted to call off the wedding (to Mary) because he learned she came from the wrong family line.",
    correctAnswer: "False",
    reference: "Matthew 1:18-19"
  },
  {
    id: "q7",
    type: "multiple-choice",
    question: "(Select one) Joseph’s hometown was known as the “City of …",
    questionHtml: "(Select one) Joseph’s <em>hometown </em>was known as the “City of …",
    options: ["Abraham", "Jacob", "David", "Moses", "None of the above"],
    correctAnswer: "David",
    reference: "Luke 2:4"
  },
  {
    id: "q8",
    type: "multiple-choice",
    question: "(Select one) The Bible says the wise men travelled from the …",
    options: ["North", "South", "East", "West", "None of the above"],
    correctAnswer: "East",
    reference: "Matthew 2:1-2, 9"
  },
  {
    id: "q9",
    type: "multiple-choice",
    question: "(Select one) The Bible indicates the wise men first arrived in …",
    options: ["Bethlehem", "Bethsaida", "Nazareth", "Caesarea Philippi", "Jerusalem"],
    correctAnswer: "Jerusalem",
    reference: "Matthew 2:1"
  },
  {
    id: "q10",
    type: "multiple-choice",
    question: "(Select one) The wise men arrived at their destination by following a …",
    options: ["Map", "Star", "Report", "Guide", "Angel"],
    correctAnswer: "Star",
    reference: "Matthew 2:2, 9"
  },
  {
    id: "q11",
    type: "true-false",
    question: "(T/F) The Christmas Story says there were three wise men.",
    correctAnswer: "False",
    reference: "Matthew 2:1-12"
  },
  {
    id: "q12",
    type: "true-false",
    question: "(T/F) The wise men are described in the Bible as kings",
    correctAnswer: "False",
    reference: "Matthew 2:1-12"
  },
  {
    id: "q13",
    type: "checkbox",
    question: "(Select all that apply) The wise men declared they had come to …",
    questionHtml: "(Select <em>all</em> that apply) The wise men declared they had come to …",
    options: [
      "Make Jesus King of the Jews",
      "Find the King of the Jews",
      "Depose the King of the Jews",
      "Worship the King of the Jews",
      "Serve the King of the Jews"
    ],
    correctAnswers: ["Find the King of the Jews", "Worship the King of the Jews"],
    reference: "Matthew 2:2"
  },
  {
    id: "q14",
    type: "multiple-choice",
    question: "(Select one) The Jewish leader who features prominently in the Christmas Story is ...",
    options: ["Pilate", "Herod", "Caesar", "Pharaoh", "Caiaphas"],
    correctAnswer: "Herod",
    reference: "Matthew 2:3-8, 16-19"
  },
  {
    id: "q15",
    type: "multiple-choice",
    question: "(Select one) Who visited the Christ child first?",
    options: ["Village rabbis", "Wise men", "Shepherds", "Scribes and Pharisees", "Sadducees"],
    correctAnswer: "Shepherds",
    reference: "Luke 2:8-16"
  },
  {
    id: "q16",
    type: "checkbox",
    question: "(Select all that apply) The wise men presented gifts to Jesus of ...",
    questionHtml: "(Select <em>all </em>that apply) The wise men presented gifts to Jesus of ...",
    options: [
      "Gold",
      "Silver",
      "Bronze",
      "Precious gems",
      "Myrrh"
    ],
    correctAnswers: ["Gold", "Myrrh"],
    reference: "Luke 2:11"
  },
  {
    id: "q17",
    type: "multiple-choice",
    question: "(Select one) The reason Joseph and Mary traveled south from their home was to …",
    options: ["See relatives", "Find work", "Evade the Law", "Register for a census", "None of the above"],
    correctAnswer: "Register for a census",
    reference: "Luke 2:4-5"
  },
  {
    id: "q18",
    type: "multiple-choice",
    question: "(Select one) Mary gave birth to Jesus in …",
    options: ["Nazareth", "Jerusalem", "Bethlehem", "Shiloh", "Beersheba"],
    correctAnswer: "Bethlehem",
    reference: "Luke 2:4-7"
  },
  {
    id: "q19",
    type: "checkbox",
    question: "(Select all that apply) After giving birth to Jesus, Mary laid Him in a …",
    questionHtml: "(Select <em>all </em>that apply) After giving birth to Jesus, Mary laid Him in a …",
    options: [
      "Bed",
      "Crib",
      "Feed trough",
      "Manger",
      "None of the above"
    ],
    correctAnswers: ["Feed trough", "Manger"],
    reference: "Luke 2:7, 12"
  },
  {
    id: "q20",
    type: "multiple-choice",
    question: "(Select one) The shepherds went to see Jesus in Bethlehem because they …",
    options: ["Discovered a prophecy", "Heard an angel", "Followed a star", "Got news from a fellow shepherd", "None of the above"],
    correctAnswer: "Followed a star",
    reference: "Luke 2:2, 9"
  },
  {
    id: "q21",
    type: "checkbox",
    question: "(Select all that apply) What was told the shepherds about the baby Jesus?",
    questionHtml: "(Select <em>all </em>that apply) What was told the shepherds about the baby Jesus?",
    options: [
      "He will not cry",
      "He will be in a manger",
      "He will be in an inn",
      "He will be wrapped in cloths",
      "He will be answering wise men's questions"
    ],
    correctAnswers: ["He will be in a manger", "He will be wrapped in cloths"],
    reference: "Luke 2:12"
  },
  {
    id: "q22",
    type: "multiple-choice",
    question: "(Select the best answer) When the shepherds arrived at the place of Jesus’ birth, they told what they had seen and heard to …",
    questionHtml: "(Select the <em>best</em> answer) When the shepherds arrived at the place of Jesus’ birth, they told what they had seen and heard to …",
    options: ["Joseph", "Mary", "Jesus", "Everyone around", "Herod"],
    correctAnswer: "Everyone around",
    reference: "Luke 2:17-18"
  },
  {
    id: "q23",
    type: "multiple-choice",
    question: "(Select one) Whom did Herod consult to learn the birthplace of the new king?",
    options: ["Fortune tellers", "Palace staffers", "Scripture experts", "Map makers", "Census directors"],
    correctAnswer: "Scripture experts",
    reference: "Matthew 2:4"
  },
  {
    id: "q24",
    type: "multiple-choice",
    question: "(Select one) Joseph was warned to flee to what country because Jesus’ life was in danger?",
    options: ["Egypt", "Jordan", "Lebanon", "Persia", "Babylon"],
    correctAnswer: "Egypt",
    reference: "Matthew 2:13"
  },
  {
    id: "q25",
    type: "multiple-choice",
    question: "(Select one) Joseph and his young family remained beyond the borders of Israel for approximately a …",
    options: ["Week", "Month", "Year", "Decade", "Scripture doesn't say"],
    correctAnswer: "Scripture doesn't say",
    reference: "Matthew 2:13-21"
  },
  {
    id: "q26",
    type: "multiple-choice",
    question: "(Select one) Joseph and his family returned to Israel because …",
    options: ["Pilate changed domestic policy", "Foreign taxes were too high", "Life abroad was too difficult", "King Herod had died", "They were persecuted as foreigners in the land where they had fled"],
    correctAnswer: "King Herod had died",
    reference: "Matthew 2:15, 19-21"
  },
  {
    id: "q27",
    type: "true-false",
    question: "(Select one) The Christmas Story says Jesus was circumcised at the Temple when He was eight days old.",
    correctAnswer: "False",
    reference: "Luke 2:21"
  },
  {
    id: "q28",
    type: "multiple-choice",
    question: "(Select one) What type of sacrifice did Joseph and Mary offer when they presented Jesus at the Temple?",
    options: ["Bird", "Grain", "Sheep", "Goat", "Bull"],
    correctAnswer: "Bird",
    reference: "Luke 2:22-24"
  },
  {
    id: "q29",
    type: "multiple-choice",
    question: "(Select one) Who took Jesus in his arms and prophesied over Him at the Temple?",
    options: ["Paul", "John the Baptist", "Agabus", "Simeon", "Philip"],
    correctAnswer: "Simeon",
    reference: "Luke 2:25-35"
  },
  {
    id: "q30",
    type: "multiple-choice",
    question: "(Select one) What woman spoke words of blessing and thanksgiving about Jesus to Joseph and Mary at the Temple?",
    options: ["Ruth", "Rachel", "Anna", "Ayala", "Phanuel"],
    correctAnswer: "Anna",
    reference: "Luke 2:36-38"
  },
  {
    id: "q31",
    type: "multiple-choice",
    question: "(Select one) How many journeys transpire in the Christmas Story?",
    options: ["Two", "Three", "Four", "Five", "Six"],
    correctAnswer: "Six",
    reference: "First - Matthew 2:1-2; Second - Luke 2:4; Third - Matthew 2:12; Fourth - Matthew 2:13-14; Fifth - Matthew 2:20-21; Six - Matthew 2:22-23"
  },
  {
    id: "q32",
    type: "multiple-choice",
    question: "(Select one) How many countries are explicitly mentioned in the Christmas Story?",
    questionHtml: "(Select one) How many countries are <em>explicitly </em>mentioned in the Christmas Story?",
    options: ["One", "Two", "Three", "Four", "Five"],
    correctAnswer: "Three",
    reference: "Matthew 2:15, 19; Matthew 2:20-21 & Luke 2:32, 34; Luke 2:2"
  },
  {
    id: "q33",
    type: "multiple-choice",
    question: "(Select one) How old was Jesus at the time of the wise men’s visit?",
    options: ["Newborn", "Six months", "One year", "Two years", "Scripture doesn't say"],
    correctAnswer: "Scripture doesn't say",
    reference: "Matthew 2:11, 16"
  },
  {
    id: "q34",
    type: "multiple-choice",
    question: "(Select one) After seeing Jesus, Scripture implies the wise men …",
    options: ["Left the following week", "Remained in Israel permanently", "Departed soon thereafter", "Stayed for about a month", "None of the above"],
    correctAnswer: "Departed soon thereafter",
    reference: "Matthew 2:11-12"
  },
  {
    id: "q35",
    type: "multiple-choice",
    question: "(Select one) How many babies does the Christmas Story say were slaughtered?",
    options: ["Hundreds", "About a thousand", "Thousands", "Millions", "Scripture doesn't say"],
    correctAnswer: "Scripture doesn't say",
    reference: "Matthew 2:16-18"
  },
  {
    id: "q36",
    type: "multiple-choice",
    question: "(Select one) The slaughter of babies in the Christmas Story was foretold by …",
    options: ["Moses", "Ezekiel", "Isaiah", "Malachi", "Jeremiah"],
    correctAnswer: "Jeremiah",
    reference: "Matthew 2:17"
  },
  {
    id: "q37",
    type: "multiple-choice",
    question: "(Select one) Joseph feared for his family when he returned to Israel because of …",
    options: ["Governor Pilate", "King Herod", "Caesar Augustus", "King Archelaus", "High Priest Caiaphas"],
    correctAnswer: "King Archelaus",
    reference: "Matthew 2:22"
  },
  {
    id: "q38",
    type: "multiple-choice",
    question: "(Select one) The Christmas Story ends in what town/city?",
    options: ["Bethlehem", "Jerusalem", "Tel Aviv", "Nazareth", "Hebron"],
    correctAnswer: "Nazareth",
    reference: "Matthew 2:23; Luke 2:39"
  },
  {
    id: "q39",
    type: "multiple-choice",
    question: "(Select one) Israel was a client kingdom of what world power during the Christmas Story?",
    options: ["Persia", "Greece", "Parthia", "Babylon", "Rome"],
    correctAnswer: "Rome",
    reference: "Luke 2:1"
  },
  {
    id: "q40",
    type: "multiple-choice",
    question: "(Select one) Which Caesar reigned at the time of the Christmas Story?",
    options: ["Quirinius", "Nero", "Augustus", "Tiberius", "Claudius"],
    correctAnswer: "Augustus",
    reference: "Luke 2:1"
  },
  {
    id: "q41",
    type: "multiple-choice",
    question: "(Select one) At the time Jesus was born, Mary and Joseph were ...",
    options: ["Married", "Dating", "Engaged", "Neighbors", "Friends"],
    correctAnswer: "Engaged",
    reference: "Luke 2:5"
  },
  {
    id: "q42",
    type: "checkbox",
    question: "(Select all that apply) How many angels did the shepherds see and hear out in the fields?",
    questionHtml: "(Select <em>all </em>that apply) How many angels did the shepherds see and hear out in the fields?",
    options: [
      "One",
      "A hundred",
      "A thousand",
      "A multitude",
      "Scripture doesn't say"
    ],
    correctAnswers: ["One", "A multitude"],
    reference: "Luke 2:10, 13"
  },
  {
    id: "q43",
    type: "multiple-choice",
    question: "(Select one) After their encounter with angels out in the fields, the shepherds ...",
    options: ["Sought out the local rabbi", "Went straight into Bethlehem", "Reported to the chief shepherd", "Went to sleep", "Fled the area"],
    correctAnswer: "Went straight into Bethlehem",
    reference: ""
  },
  {
    id: "q44",
    type: "multiple-choice",
    question: "(Select one) Jesus was born under which covenant?",
    options: ["Noahic", "New", "Mayflower", "Mosaic", "Messianic"],
    correctAnswer: "Mosaic",
    reference: "Luke 2:22"
  },
  {
    id: "q45",
    type: "multiple-choice",
    question: "(Select one) How many dreams in total are in the Christmas Story?",
    options: ["Three", "Four", "Five", "Six", "Seven"],
    correctAnswer: "Five",
    reference: "Matthew 1:20-23; 2:12; 2:13; 2:19–20; 2:2"
  },
  {
    id: "q46",
    type: "checkbox",
    question: "(Select all that apply) What was Joseph instructed to do during the first of his dreams?",
    questionHtml: "(Select <em>all </em>that apply) What was Joseph instructed to do during the first of his dreams?",
    options: [
      "Marry Mary",
      "Divorce Mary",
      "Go to Jerusalem",
      "Name the baby",
      "Pray for faith"
    ],
    correctAnswers: ["Marry Mary", "Name the baby"],
    reference: "Matthew 1:20-21"
  },
  {
    id: "q47",
    type: "multiple-choice",
    question: "(Select one) Joseph was in the land of ________ when he had his final dream.",
    options: ["Syria", "Nabatea", "Egypt", "Israel", "Babylon"],
    correctAnswer: "Israel",
    reference: "Matthew 2:21-22"
  }
];
