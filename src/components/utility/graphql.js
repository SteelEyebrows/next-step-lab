export const queryCall=`
query list{
  listMyTypes{
    items{
      id type name grade class link todo words{
        id name link percentage haveto
      } record{id month day words etc}}
    }
  }
`;

export const queryCstudent=`
query list{
  listMyTypes(filter:{type:{contains:"student"}},limit:100){
    items{
      id type name grade class link todo haveto due 
      words{id name link haveto due} 
      record{id bookid month day words etc}
      test{id name score month day}
      homework{id name assignment done month day}
    }
    }
  }

`;

export const studentsWords = `query list{
  listMyTypes(filter:{type:{contains:"student"}}){
    items{
      id name words{id name link due haveto deleted}
    }
}}` //for deleteWord


export const queryCteacher=`
query list{
  listMyTypes(filter:{type:{contains:"teacher"}}){
    items{
      id type name grade class
    }
  }

`;

export const queryCword=`
query list{
  listMyTypes(filter:{type:{contains:"word"}}  limit:100){
    items{
      id name link haveto due deleted
    }
  }
}
`;


export const createSample= `mutation createMyType($input: CreateMyTypeInput!) {
  createMyType(input: $input) {
      id
      type
      name
      address
      words{id name link haveto} 
      record{id month day words etc}
  }
}
`;


// id: Math.random().toString(36).substring(7),
// type: "sample",
// name: this.state.username,
// address:this.state.company,
// words:[{
//   id:"04453285-6e33-495e-8a40-c5a15ea3cf1f",
//   name:"2020 VOCA.json",
//   link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA.json",
//   haveto:100,
//   due: due
// },{
// id:"2c148799-a0e2-4b92-a2d3-66e4a7b8866d",
// name:"2020 VOCA2.json",
// link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA2.json",
// haveto:100,
// due: due
// }],
// record:record
// });


export const createStudent= `mutation createMyType($input: CreateMyTypeInput!) {
  createMyType(input: $input) {
      id
      type
      name
      grade
      class
      words{id name link haveto due} 
      record{id bookid month day words etc}
  }
}
`;
export const createStudent2= `mutation createMyType($input: CreateMyTypeInput!) {
  createMyType(input: $input) {
      id
      type
      name
      grade
      class
      words{id name link haveto}
      record{
        id bookid month day words etc
      }
  }
}
`;
export const createStudent3= `mutation createMyType($input: CreateMyTypeInput!) {
  createMyType(input: $input) {
      id
      type
      name
      address
      words{id name link haveto due} 
      record{id bookid month day words etc}
  }
}
`;

export const createWord = `mutation createMyType($input: CreateMyTypeInput!) {
    createMyType(input: $input) {
        id
        type
        name
        grade
        link
        address
        deleted
    }
  }
  `;// address => 기간  grade => have to

  export const updateAll = `mutation updateMyType($input: UpdateMyTypeInput!) {
    updateMyType(input: $input) {
        id
        name
        grade
    }
  }
  `;

  export const updateWord = `mutation updateMyType($input: UpdateMyTypeInput!) {
    updateMyType(input: $input) {
        id
        words{name link due haveto deleted}
    }
  }
  `;
  export const updateHomework = `mutation updateMyType($input: UpdateMyTypeInput!) {
    updateMyType(input: $input) {
      id 
      homework{id name assignment done month day}
    }
  }
  `;
  export const updateTestRecord = `mutation updateMyType($input: UpdateMyTypeInput!) {
    updateMyType(input: $input) {
      id 
      test{id name score month day}
    }
  }
  `;
  export const deleteWord = `mutation updateMyType($input: UpdateMyTypeInput!) {
    updateMyType(input: $input) {
        id
        deleted
    }
  }
  `;


  export const deleteWordOrigin = `mutation deleteMyType($input: DeleteMyTypeInput!) {
    deleteMyType(input: $input) {
      id
    }
  }
  `;


  // mutation create{
  //   updateMyType(input:{
  //     id:"465tq4"
	// 		homework:{name:"숙제1" assignment:50 done:20 date:"20/02/13"}
  //   }){
  //     homework{name assignment done date}
  //   }
  // }   

  // mutation create{
  //   updateMyType(input:{
  //     id:"3p4ugo5b31"
	// 		record:[{id:"sgragerewara"month:2,day:4,words:"test.json"},
  //     {id:"sdfgsdfg"month:2,day:3,words:"test.json"},
  //     {id:"strwebsf"month:2,day:2,words:"test.json"},]
  //   }){
  //     id record{id,month,day,words}
  //   }
  // }  


  // mutation create{
  //   updateMyType(input:{
  //     id:"3p4ugo5b31"
	// 		record:{id:"sgragerewara"month:2,day:4,words:"test.json"}
  //   }){
  //     id record{id,month,day,words}
  //   }
  // }  


  // mutation create{
  //   createMyType(input:{
  //     id:"test.json"
  //     type:"word"
  //     name:"test.json"
  //     link:"https://wowproject-wow.s3.ap-northeast-2.amazonaws.com/test.json"
  //     words:[
  //       {
  //         id: null
  //         name: null
  //         link:null
  //       }
  //     ]
  //   }){
  //     id type name link words{id name link}
  //   }
  // }  

  // mutation create{
  //   createMyType(input:{
  //     id:"oatem28pmc"
  //     type:"student"
  //     name:"이병건"
  //     grade:"m1"
  //     percentage:50,
  //     words:[
  //       {
  //         id: "test.json"
  //         name: "test.json"
  //         link:"https://wowproject-wow.s3.ap-northeast-2.amazonaws.com/test.json"
  //       }
  //     ]
  //   }){
  //     id type name grade percentage words{id name link}
  //   }
  // }


// mutation create{
//   createToNote(input:{
//     name:"note"
//   	description:"전체숙제"
//     grades:[{id:"01", name:"중등 1학년", students:[
//       {id:"011" name:"홍길동",percentage:86,assignment:"숙제"},
//       {id:"012" name:"이민정",percentage:30,assignment:"숙제"}
//     ]},
//     {id:"02", name:"중등 2학년", students:[
//       {id:"021" name:"박보영",percentage:100,assignment:"숙제"},
//       {id:"022" name:"신민아",percentage:60,assignment:"숙제"}
//     ]},
//     {id:"03", name:"중등 3학년", students:[
//       {id:"031" name:"이병건",percentage:50,assignment:"숙제"},
//       {id:"032" name:"주호민",percentage:90,assignment:"숙제"}
//     ]}  
//     ]
//   }){
//     id name description grades{id name students{
//       id name percentage assignment
//     }}
//   }
// }

// mutation {
//   deleteToNote (
//     input:{
//       id:"48f61355-996a-4a46-8638-3799aca806c7"
//     }
//   ) {
//   	id
//   }
// }

// const nodes = [{
//   value: 'mid',
//   label: '중학교',
//   children: [
//       { value: 'm1', label: '1학년' },
//       { value: 'm2', label: '2학년' },
//       { value: 'm3', label: '3학년' },
//   ],
// },{
//   value: 'high',
//   label: '고등학교',
//   children: [
//     { value: 'h1', label: '1학년' },
//     { value: 'h2', label: '2학년' },
//     { value: 'h3', label: '3학년' },
//   ],
// }];




// mutation create{
//   updateToNote(input:{
//     id:"9957304a-191c-4f7d-b2a5-192ba1151717"
//     grades:[{ id:"01"
//       students:[{id:"011" percentage: 30 assignment: "string"}]}]    
//   }){
//     id grades{id students{
//       id percentage assignment
//     }}
//   }
// }


// mutation create{
// 	createMyType(input:{
//     	type:"word"
//     	name:"중3단어"
// 			grade: "m3"
//     	words:"단어"
//   }){
// 	type name grade words
//   }
// }





// input CreateToNoteInput {
// 	id: ID
// 	name: String!
// 	description: String
// 	grades: [GradeInput]
// }

// input DeleteToNoteInput {
// 	id: ID
// }

// type Grade {
// 	id: ID!
// 	name: String
// 	students: [Student]
// }

// input GradeInput {
// 	id: ID!
// 	name: String
// 	students: [StudentInput]
// }

// input ModelBooleanFilterInput {
// 	ne: Boolean
// 	eq: Boolean
// }

// input ModelFloatFilterInput {
// 	ne: Float
// 	eq: Float
// 	le: Float
// 	lt: Float
// 	ge: Float
// 	gt: Float
// 	contains: Float
// 	notContains: Float
// 	between: [Float]
// }

// input ModelIDFilterInput {
// 	ne: ID
// 	eq: ID
// 	le: ID
// 	lt: ID
// 	ge: ID
// 	gt: ID
// 	contains: ID
// 	notContains: ID
// 	between: [ID]
// 	beginsWith: ID
// }

// input ModelIntFilterInput {
// 	ne: Int
// 	eq: Int
// 	le: Int
// 	lt: Int
// 	ge: Int
// 	gt: Int
// 	contains: Int
// 	notContains: Int
// 	between: [Int]
// }

// enum ModelSortDirection {
// 	ASC
// 	DESC
// }

// input ModelStringFilterInput {
// 	ne: String
// 	eq: String
// 	le: String
// 	lt: String
// 	ge: String
// 	gt: String
// 	contains: String
// 	notContains: String
// 	between: [String]
// 	beginsWith: String
// }

// type ModelToNoteConnection {
// 	items: [ToNote]
// 	nextToken: String
// }

// input ModelToNoteFilterInput {
// 	id: ModelIDFilterInput
// 	name: ModelStringFilterInput
// 	description: ModelStringFilterInput
// 	and: [ModelToNoteFilterInput]
// 	or: [ModelToNoteFilterInput]
// 	not: ModelToNoteFilterInput
// }

// type Mutation {
// 	createToNote(input: CreateToNoteInput!): ToNote
// 	updateToNote(input: UpdateToNoteInput!): ToNote
// 	UpdateGrade(input: UpdateGradeInput!): [Grade]
// 	UpdateStudent(input: UpdateStudentInput!): Student
// 	deleteToNote(input: DeleteToNoteInput!): ToNote
// 	addGrade(input: [GradeInput]): [Grade]
// 	addStudent(input: [StudentInput]): Student
// }

// type Query {
// 	getToNote(id: ID!): ToNote
// 	listToNotes(filter: ModelToNoteFilterInput, limit: Int, nextToken: String): ModelToNoteConnection
// }

// type Student {
// 	id: ID!
// 	name: String
// 	percentage: Int
// 	assignment: String
// }

// input StudentInput {
// 	id: ID!
// 	name: String
// 	percentage: Int
// 	assignment: String
// }

// type Subscription {
// 	onCreateToNote: ToNote
// 		@aws_subscribe(mutations: ["createToNote"])
// 	onUpdateToNote: ToNote
// 		@aws_subscribe(mutations: ["updateToNote"])
// 	onDeleteToNote: ToNote
// 		@aws_subscribe(mutations: ["deleteToNote"])
// }

// type ToNote {
// 	id: ID!
// 	name: String!
// 	description: String
// 	grades: [Grade]
// }

// input UpdateGradeInput {
// 	id: ID
// 	students: [StudentInput]
// }

// input UpdateStudentInput {
// 	id: ID!
// 	percentage: Int
// 	assignment: String
// }

// input UpdateToNoteInput {
// 	id: ID!
// 	grades: [GradeInput]
// }