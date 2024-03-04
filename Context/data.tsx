const ques: any = {
  teacher: [
    {
      id: 't1',
      question: 'What’s your first name',
      type: 'input',
      input_type: 'text',
      input_placeholder: 'First name',
      required: false,
      answer: '',
    },
    {
      id: 't2',
      question: 'How long have you been a teacher?',
      type: 'radio',
      options: ['1-5 years', '6-10 years', '11+ years'],
      required: false,
      answer: '',
    },
    {
      id: 't3',
      question:
        'How would you rate your knowledge in designing learning experiences for children?', // required
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 't4',
      question:
        'How would you rate your ability to deliver knowledge in a way that is simple and understandable?', // required
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 't5',
      question:
        'How would you rate the performance of your school in providing an enabling environment for you to teach successfully?', // required
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 't6',
      question:
        "How would you rate the performance of parents in supporting their ward's learning?", // required
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 't7',
      question:
        'How accessible is knowledge and mentorship from other teachers and experienced mentors?', // required
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 't8',
      question:
        'Given the current realities, will most of your students like to become a teacher?',
      type: 'radio',
      options: ['Yes', 'No'],
      required: false,
      answer: '',
    },
    {
      id: 't9',
      question: 'What’s your email address',
      type: 'input',
      input_type: 'email',
      input_placeholder: 'Email address',
      required: false,
      answer: '',
    },
  ],
  parent: [
    {
      id: 'p1',
      question: 'What’s your first name',
      type: 'input',
      input_type: 'text',
      input_placeholder: 'First name',
      required: false,
      answer: '',
    },
    {
      id: 'p2',
      question:
        'How would you rate the sense of connection and the quality of communication with your children?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'p3',
      question:
        'How accessible is knowledge and mentorship from other parents and experienced mentors?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'p4',
      question: "How satisfied are you with your child's academic performance?",
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'p5',
      question:
        "How will you rate your participation in your child's learning?",
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'p6',
      question:
        "How well would you say you understand your child's learning style?",
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'p7',
      question:
        "How would you rate the perfomance of your child/children's school?",
      type: 'slider',
      required: true,
      score: 0,
    },

    {
      id: 'p8',
      question: 'What’s your email address',
      type: 'input',
      input_type: 'email',
      input_placeholder: 'Email address',
      answer: '',
      required: false,
    },
  ],
  'school admin': [
    {
      id: 'sa1',
      question: 'What’s your first name',
      type: 'input',
      input_type: 'text',
      input_placeholder: 'First name',
      required: false,
      answer: '',
    },
    {
      id: 'sa2',
      question: 'How long have you been a school administrator?', // not required
      type: 'slider',
      min: 0,
      max: 50,
      required: false,
      answer: '',
    },
    {
      id: 'sa3',
      question:
        'How would you rate the academic performance of most of your students?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa4',
      question:
        'How satisfied are you with the current level of teacher-parent collaboration in your school?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa5',
      question:
        'How easily are you able to connect your staff with resources, courses, and mentors for professional development?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa6',
      question: 'How satisfied are you with how well your school is known?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa7',
      question:
        'To what extent are your students able to consider their teachers as life models?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa8',
      question:
        'How satisfied are you with the contribution of parents to the academic development of their wards?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa9',
      question:
        'How would you rate the ease of hiring new staff into your school?',
      type: 'slider',
      required: true,
      score: 0,
    },
    {
      id: 'sa10',
      question: 'What’s your email address',
      type: 'input',
      input_type: 'email',
      input_placeholder: 'Email address',
      required: false,
      answer: '',
    },
  ],
}

export { ques }
