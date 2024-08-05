import { Icons, Images } from '@/assets'
import { ReactNode } from 'react'
import { ImFolderUpload } from 'react-icons/im'

export interface IlearningData {
  id: string
  icon: React.ReactNode
  text: string
  writeup: string
}

export const learningData: IlearningData[] = [
  {
    id: 'learning',
    icon: <Icons.PuzzleIcon />,
    text: 'Personalized Experience',
    writeup:
      'Access support that suits your unique gaps, weaknesses, interests, and aspirations',
  },
  {
    id: 'community',
    icon: <Icons.CommunityIcon />,
    text: 'Community Driven',
    writeup:
      'Learn and grow faster with other passionate people. Share resources quickly and easily',
  },
  {
    id: 'impact',
    icon: <Icons.ImpactIcon />,
    text: 'Trackable Impact',
    writeup:
      'Set goals and measure progress. With your goals in sight, growth is guaranteed',
  },
  {
    id: 'career',
    icon: <Icons.AdvancementIcon />,
    text: 'Career Advancement',
    writeup:
      'Develop value, build relevance, gain visibility and attract opportunities',
  },
]

export interface Ibigquestion {
  text: ReactNode
  icon: any
}

export const bigQuesData: Ibigquestion = {
  text: (
    <div>
      <p
        className={`md:text-2xl lg:text-left lg:text-3xl xl:text-left md:text-left text-center sm:text-left text-white md:mt-0 -mt-5 md:hidden text-[16px]`}
      >
        Parents, schools and teachers care for the children but who cares for
        them?
      </p>

      <h2 className=" md:text-[38px] md:block lg:block xl:block  hidden">
        Parents, schools and
      </h2>
      <h2 className="md:text-[38px] md:block lg:block xl:block  hidden">
        teachers care for the children
      </h2>
      <h2 className="md:text-[38px] md:block lg:block xl:block  hidden">
        but who cares for them?
      </h2>
    </div>
  ),
  icon: Images.QuestionImage,
}

export type IFaqData = {
  key: string
  label: string
  children: React.ReactNode
}

export const faqData: IFaqData[] = [
  {
    key: 'faq1',
    label: 'How do I get started with Tayture?',
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        Sign up to get an account on tayture, then update your profile and begin
        to enjoy the features on your dashboard every time you log in.
      </p>
    ),
  },
  {
    key: 'faq2',
    label: 'Why was Tayture built?',
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        To boost effectiveness for educators and parents while raising the
        standards and rewards in education. Tayture was built by a group of
        educators and social innovators who realised that much of after-school
        time is consumed on the same things that were meant to be achieved in
        school. Hence, we built Tayture to enable teachers, parents and school
        administrators reinvent their roles so that they can make quality
        contributions for a long term impact on learners.
      </p>
    ),
  },
  {
    key: 'faq3',
    label: 'How can Tayture impact the world of teaching?',
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        If any profession can be regarded as prestigious, teaching is.
        Unfortunately, it is not treated so. Our litmus test for this is to ask
        a random group of learners, &quot;how many of you will like to become a
        teacher?&quot; Teachers are often stressed, unable to enjoy significant
        career fulfillment, endure meagre remuneration despite providing over
        60% of the training a child receives to become a contributor to societal
        advancement. Tayture was built to reconstruct teachers&apos; mindset for
        excellence and enable them become true models for learners with a direct
        impact on the teachers welfare while boosting fulfillment and dignity
        for the teaching profession.
      </p>
    ),
  },
]

export const dataCarousel = [
  {
    id: 'd1',
    title: 'Find a job',
    text: 'Be the first to discover new job opportunities',
    icon: <Icons.ArrowLongIcon />,
    img: <Icons.JobIcon width="60" className="translate-y-2 translate-x-0" />,
    link: '/dashboard/jobs',
  },
  {
    id: 'd2',
    title: 'My school',
    text: 'Explore and manage your school information',
    icon: <Icons.ArrowLongIcon />,
    img: <Icons.ResumeIcon width="60" className="-translate-y-0" />,
    link: '/dashboard/school',
  },
  {
    id: 'd3',
    title: 'Upload',
    text: 'Upload your resume today to elevate your profile',
    icon: <Icons.ArrowLongIcon />,
    img: (
      <div className="-translate-y-4 -translate-x-2">
        <ImFolderUpload size={35} color="#FF7517" />
      </div>
    ),
    link: null,
  },
  {
    id: 'd4',
    title: 'coming',
    text: 'Take professional development courses',
    icon: <Icons.ArrowLongIcon />,
    img: (
      <Icons.ProffesionalIcon
        width="45"
        className="translate-y-4 -translate-x-2"
      />
    ),
    link: null,
  },
]

export const schoolData = (isAdmin: boolean) => {
  return [
    {
      title: 'Post a job',
      text: 'Vacancy at your school? Explore a pool of talented professionals',
      icon: <Icons.ArrowLongIcon />,
      img: (
        <Icons.PostJobIcon
          width="60"
          className="-translate-y-0 translate-x-0"
        />
      ),
      link: isAdmin ? '/dashboard/school/new?post_job=1' : null,
    },
    {
      title: 'Manage jobs',
      text: 'Coordinate your entire recruitment process in one place.',
      link: isAdmin ? '/dashboard/school/manage/all' : null,
      icon: <Icons.ArrowLongIcon />,
      img: (
        <Icons.ManageJobsIcon
          width="100"
          height="170"
          className="-translate-y-2"
        />
      ),
    },
    {
      title: 'Add school',
      text: 'Create a profile for your school to access exclusive features.',
      icon: <Icons.ArrowLongIcon />,
      img: (
        <Icons.AddSchoolIcon
          width="85"
          className="translate-y-3 translate-x-0"
        />
      ),
      link: isAdmin ? '/dashboard/school/new' : null,
    },
  ]
}

export const dataJobs = [
  {
    id: 'd1',
    title: 'My job',
    text: 'Be the first to discover new job opportunities',
    icon: <Icons.ArrowLongIcon />,
    img: <Icons.JobIcon width="60" className="translate-y-2 translate-x-0" />,
    link: '/dashboard/jobs/all',
  },
  {
    id: 'd2',
    title: 'My school',
    text: 'Explore and manage your school information',
    icon: <Icons.ArrowLongIcon />,
    img: <Icons.ResumeIcon width="60" className="-translate-y-0" />,
    link: '/dashboard/school',
  },
  {
    id: 'd3',
    title: 'Upload',
    text: 'Upload your resume today to elevate your profile',
    icon: <Icons.ArrowLongIcon />,
    img: (
      <div className="-translate-y-4 -translate-x-2">
        <ImFolderUpload size={35} color="#FF7517" />
      </div>
    ),
    link: null,
  },
  {
    id: 'd4',
    title: 'coming',
    text: 'Take professional development courses',
    icon: <Icons.ArrowLongIcon />,
    img: (
      <Icons.ProffesionalIcon
        width="45"
        className="translate-y-4 -translate-x-2"
      />
    ),
    link: null,
  },
]

export const employes = [
  { key: '0-10', value: '0-10' },
  { key: '11-20', value: '11-20' },
  { key: '21-30', value: '21-30' },
  { key: '31-40', value: '31-40' },
  { key: '41-50', value: '41-50' },
  { key: '51+', value: '51+' },
]

export const cities: any = {
  'Abia State': [
    'Aba',
    'Amaigbo',
    'Arochukwu',
    'Bende',
    'Ohafia-Ifigh',
    'Umuahia',
  ],
  'Adamawa State': [
    'Ganye',
    'Gombi',
    'Holma',
    'Jimeta',
    'Madagali',
    'Mayo-Belwa',
    'Mubi',
    'Ngurore',
    'Numan',
    'Toungo',
    'Yola',
  ],
  'Akwa Ibom State': ['Eket', 'Esuk Oron', 'Ikot Ekpene', 'Itu', 'Uyo'],
  'Anambra State': [
    'Agulu',
    'Atani',
    'Awka',
    'Enugu-Ukwu',
    'Igbo-Ukwu',
    'Ihiala',
    'Nkpor',
    'Nnewi',
    'Onitsha',
    'Ozubulu',
    'Uga',
    'Uruobo-Okija',
  ],
  'Bauchi State': [
    'Azare',
    'Bauchi',
    'Boi',
    'Bununu',
    'Darazo',
    'Dass',
    'Dindima',
    'Disina',
    'Gabarin',
    'Gwaram',
    'Kari',
    'Lame',
    'Lere',
    'Madara',
    'Misau',
    'Sade',
    'Yamrat',
    'Yanda Bayo',
    'Yuli',
    'Zadawa',
    'Zalanga',
  ],
  'Bayelsa State': ['Amassoma', 'Twon-Brass', 'Yenagoa'],
  'Benue State': [
    'Aliade',
    'Boju',
    'Igbor',
    'Makurdi',
    'Ochobo',
    'Otukpa',
    'Takum',
    'Ugbokpo',
    'Yandev',
    'Zaki Biam',
  ],
  'Borno State': [
    'Bama',
    'Benisheikh',
    'Biu',
    'Bornu Yassu',
    'Damasak',
    'Damboa',
    'Dikwa',
    'Gamboru',
    'Gwoza',
    'Kukawa',
    'Magumeri',
    'Maiduguri',
    'Marte',
    'Miringa',
    'Monguno',
    'Ngala',
    'Shaffa',
    'Shani',
    'Tokombere',
    'Uba',
    'Wuyo',
    'Yajiwa',
  ],
  'Cross River State': ['Akankpa', 'Calabar', 'Gakem', 'Ikang', 'Ugep'],
  'Delta State': [
    'Abraka',
    'Agbor',
    'Asaba',
    'Bomadi',
    'Burutu',
    'Kwale',
    'Obiaruku',
    'Ogwashi-Uku',
    'Orerokpe',
    'Patani',
    'Sapele',
    'Ughelli',
    'Umunede',
    'Warri',
  ],
  'Ebonyi State': ['Abakaliki', 'Afikpo', 'Effium', 'Ezza-Ohu', 'Isieke'],
  'Edo State': [
    'Agenebode',
    'Auchi',
    'Benin City',
    'Ekpoma',
    'Igarra',
    'Illushi',
    'Siluko',
    'Ubiaja',
    'Uromi',
  ],
  'Ekiti State': [
    'Ado-Ekiti',
    'Aramoko-Ekiti',
    'Efon-Alaaye',
    'Emure-Ekiti',
    'Ifaki',
    'Igbara-Odo',
    'Igede-Ekiti',
    'Ijero-Ekiti',
    'Ikere-Ekiti',
    'Ipoti',
    'Ise-Ekiti',
    'Oke Ila',
    'Omuo-Ekiti',
  ],
  'Enugu State': [
    'Adani',
    'Ake-Eze',
    'Aku',
    'Amagunze',
    'Awgu',
    'Eha Amufu',
    'Enugu',
    'Enugu-Ezike',
    'Ete',
    'Ikem',
    'Mberubu',
    'Nsukka',
    'Obolo-Eke (1)',
    'Opi',
    'Udi',
  ],
  'Federal Capital Territory': ['Abuja', 'Kuje', 'Kwali', 'Madala'],
  'Gombe State': [
    'Akko',
    'Bara',
    'Billiri',
    'Dadiya',
    'Deba',
    'Dukku',
    'Garko',
    'Gombe',
    'Hinna',
    'Kafarati',
    'Kaltungo',
    'Kumo',
    'Nafada',
    'Pindiga',
  ],
  'Imo State': ['Iho', 'Oguta', 'Okigwe', 'Orlu', 'Orodo', 'Owerri'],
  'Jigawa State': [
    'Babura',
    'Birnin Kudu',
    'Birniwa',
    'Dutse',
    'Gagarawa',
    'Gumel',
    'Gwaram',
    'Hadejia',
    'Kafin Hausa',
    'Kazaure',
    'Kiyawa',
    'Mallammaduri',
    'Ringim',
    'Samamiya',
  ],
  'Kaduna State': [
    'Anchau',
    'Burumburum',
    'Dutsen Wai',
    'Hunkuyi',
    'Kachia',
    'Kaduna',
    'Kafanchan',
    'Kagoro',
    'Kajuru',
    'Kujama',
    'Lere',
    'Mando',
    'Saminaka',
    'Soba',
    'Sofo-Birnin-Gwari',
    'Zaria',
  ],
  'Kano State': ['Dan Gora', 'Gaya', 'Kano'],
  'Katsina State': [
    'Danja',
    'Dankama',
    'Daura',
    'Dutsin-Ma',
    'Funtua',
    'Gora',
    'Jibia',
    'Jikamshi',
    'Kankara',
    'Katsina',
    'Mashi',
    'Ruma',
    'Runka',
    'Wagini',
  ],
  'Kebbi State': [
    'Argungu',
    'Bagudo',
    'Bena',
    'Bin Yauri',
    'Birnin Kebbi',
    'Dabai',
    'Dakingari',
    'Gulma',
    'Gwandu',
    'Jega',
    'Kamba',
    'Kangiwa',
    'Kende',
    'Mahuta',
    'Maiyama',
    'Shanga',
    'Wasagu',
    'Zuru',
  ],
  'Kogi State': [
    'Abocho',
    'Adoru',
    'Ankpa',
    'Bugana',
    'Dekina',
    'Egbe',
    'Icheu',
    'Idah',
    'Isanlu-Itedoijowa',
    'Kabba',
    'Koton-Karfe',
    'Lokoja',
    'Ogaminana',
    'Ogurugu',
    'Okene',
  ],
  'Kwara State': [
    'Ajasse Ipo',
    'Bode Saadu',
    'Gwasero',
    'Ilorin',
    'Jebba',
    'Kaiama',
    'Lafiagi',
    'Offa',
    'Okuta',
    'Omu-Aran',
    'Patigi',
    'Suya',
    'Yashikera',
  ],
  'Lagos State': [
    'Apapa',
    'Badagry',
    'Ebute Ikorodu',
    'Ejirin',
    'Epe',
    'Ikeja',
    'Lagos',
    'Lekki',
    'Ikorodu',
    'Ojo',
    'Makoko',
  ],
  'Nasarawa State': ['Buga', 'Doma', 'Keffi', 'Lafia', 'Nasarawa', 'Wamba'],
  'Niger State': [
    'Auna',
    'Babana',
    'Badeggi',
    'Baro',
    'Bokani',
    'Duku',
    'Ibeto',
    'Konkwesso',
    'Kontagora',
    'Kusheriki',
    'Kuta',
    'Lapai',
    'Minna',
    'New Shagunnu',
    'Suleja',
    'Tegina',
    'Ukata',
    'Wawa',
    'Zungeru',
  ],
  'Ogun State': [
    'Abeokuta',
    'Ado Odo',
    'Idi Iroko',
    'Ifo',
    'Ijebu-Ife',
    'Ijebu-Igbo',
    'Ijebu-Ode',
    'Ilaro',
    'Imeko',
    'Iperu',
    'Isara',
    'Owode',
  ],
  'Ondo State': [
    'Agbabu',
    'Akure',
    'Idanre',
    'Ifon',
    'Ilare',
    'Ode',
    'Ondo',
    'Ore',
    'Owo',
  ],
  'Osun State': [
    'Apomu',
    'Ejigbo',
    'Gbongan',
    'Ijebu-Jesa',
    'Ikire',
    'Ikirun',
    'Ila Orangun',
    'Ile-Ife',
    'Ilesa',
    'Ilobu',
    'Inisa',
    'Iwo',
    'Modakeke',
    'Oke Mesi',
    'Olupona',
    'Osogbo',
    'Otan Ayegbaju',
    'Oyan',
  ],
  'Oyo State': [
    'Ago Are',
    'Alapa',
    'Fiditi',
    'Ibadan',
    'Igbeti',
    'Igbo-Ora',
    'Igboho',
    'Kisi',
    'Lalupon',
    'Ogbomoso',
    'Okeho',
    'Orita Eruwa',
    'Oyo',
    'Saki',
  ],
  'Plateau State': [
    'Amper',
    'Bukuru',
    'Dengi',
    'Jos',
    'Kwolla',
    'Langtang',
    'Pankshin',
    'Panyam',
    'Vom',
    'Yelwa',
  ],
  'Sokoto State': [
    'Binji',
    'Dange',
    'Gandi',
    'Goronyo',
    'Gwadabawa',
    'Illela',
    'Rabah',
    'Sokoto',
    'Tambuwal',
    'Wurno',
  ],
  'Taraba State': [
    'Baissa',
    'Beli',
    'Gassol',
    'Gembu',
    'Ibi',
    'Jalingo',
    'Lau',
    'Mutum Biyu',
    'Riti',
    'Wukari',
  ],
  'Yobe State': [
    'Damaturu',
    'Dankalwa',
    'Dapchi',
    'Daura',
    'Fika',
    'Gashua',
    'Geidam',
    'Goniri',
    'Gorgoram',
    'Gujba',
    'Gwio Kura',
    'Kumagunnam',
    'Lajere',
    'Machina',
    'Nguru',
    'Potiskum',
  ],
  'Zamfara State': [
    'Anka',
    'Dan Sadau',
    'Gummi',
    'Gusau',
    'Kaura Namoda',
    'Kwatarkwashi',
    'Maru',
    'Moriki',
    'Sauri',
    'Tsafe',
  ],
  Rivers: [
    'Port Harcourt',
    'Obio-Akpor',
    'Eleme',
    'Oyigbo',
    'Ikwerre',
    'Emohua',
    'Etche',
    'Gokana',
    'Khana',
    'Tai',
    'Ogu–Bolo',
    'Andoni',
    'Bonny',
    'Degema',
    'Asari-Toru',
    'Akuku-Toru',
    'Okrika',
    'Ahoada East',
    'Ahoada West',
    'Omuma',
    'Ikwerre',
    'Ogba–Egbema–Ndoni',
    'Opobo–Nkoro',
    'Ikwerre',
    'Abua–Odual',
    'Okrika',
    'Oyigbo',
    'Tai',
    'Akuku-Toru',
    'Andoni',
    'Khana',
    'Gokana',
    'Eleme',
    'Obio-Akpor',
    'Port Harcourt',
    'Bonny',
    'Degema',
    'Asari-Toru',
    'Opobo–Nkoro',
    'Ikwerre',
    'Ahoada East',
    'Ahoada West',
    'Omuma',
    'Ogba–Egbema–Ndoni',
    'Abua–Odual',
  ],
}

export const states: { name: string; state_code: string }[] = [
  { name: 'Abia State', state_code: 'AB' },
  { name: 'Adamawa State', state_code: 'AD' },
  { name: 'Akwa Ibom State', state_code: 'AK' },
  { name: 'Anambra State', state_code: 'AN' },
  { name: 'Bauchi State', state_code: 'BA' },
  { name: 'Bayelsa State', state_code: 'BY' },
  { name: 'Benue State', state_code: 'BE' },
  { name: 'Borno State', state_code: 'BO' },
  { name: 'Cross River State', state_code: 'CR' },
  { name: 'Delta State', state_code: 'DE' },
  { name: 'Ebonyi State', state_code: 'EB' },
  { name: 'Edo State', state_code: 'ED' },
  { name: 'Ekiti State', state_code: 'EK' },
  { name: 'Enugu State', state_code: 'EN' },
  { name: 'Federal Capital Territory', state_code: 'FC' },
  { name: 'Gombe State', state_code: 'GO' },
  { name: 'Imo State', state_code: 'IM' },
  { name: 'Jigawa State', state_code: 'JI' },
  { name: 'Kaduna State', state_code: 'KD' },
  { name: 'Kano State', state_code: 'KN' },
  { name: 'Katsina State', state_code: 'KT' },
  { name: 'Kebbi State', state_code: 'KE' },
  { name: 'Kogi State', state_code: 'KO' },
  { name: 'Kwara State', state_code: 'KW' },
  { name: 'Lagos State', state_code: 'LA' },
  { name: 'Nasarawa State', state_code: 'NA' },
  { name: 'Niger State', state_code: 'NI' },
  { name: 'Ogun State', state_code: 'OG' },
  { name: 'Ondo State', state_code: 'ON' },
  { name: 'Osun State', state_code: 'OS' },
  { name: 'Oyo State', state_code: 'OY' },
  { name: 'Plateau State', state_code: 'PL' },
  { name: 'Sokoto State', state_code: 'SO' },
  { name: 'Taraba State', state_code: 'TA' },
  { name: 'Yobe State', state_code: 'YO' },
  { name: 'Zamfara State', state_code: 'ZA' },
]
export const holder: any = {
  'Abia State': [
    'Aba North',
    'Aba South',
    'Arochukwu',
    'Bende',
    'Ikwuano',
    'Isiala Ngwa North',
    'Isiala Ngwa South',
    'Isuikwuato',
    'Obi Ngwa',
    'Ohafia',
    'Osisioma',
    'Ugwunagbo',
    'Ukwa East',
    'Ukwa West',
    'Umuahia North',
    'muahia South',
    'Umu Nneochi',
  ],
  'Adamawa State': [
    'Demsa',
    'Fufure',
    'Ganye',
    'Gayuk',
    'Gombi',
    'Grie',
    'Hong',
    'Jada',
    'Larmurde',
    'Madagali',
    'Maiha',
    'Mayo Belwa',
    'Michika',
    'Mubi North',
    'Mubi South',
    'Numan',
    'Shelleng',
    'Song',
    'Toungo',
    'Yola North',
    'Yola South',
  ],
  'Akwa Ibom State': [
    'Abak',
    'Eastern Obolo',
    'Eket',
    'Esit Eket',
    'Essien Udim',
    'Etim Ekpo',
    'Etinan',
    'Ibeno',
    'Ibesikpo Asutan',
    'Ibiono-Ibom',
    'Ika',
    'Ikono',
    'Ikot Abasi',
    'Ikot Ekpene',
    'Ini',
    'Itu',
    'Mbo',
    'Mkpat-Enin',
    'Nsit-Atai',
    'Nsit-Ibom',
    'Nsit-Ubium',
    'Obot Akara',
    'Okobo',
    'Onna',
    'Oron',
    'Oruk Anam',
    'Udung-Uko',
    'Ukanafun',
    'Uruan',
    'Urue-Offong Oruko',
    'Uyo',
  ],
  'Anambra State': [
    'Aguata',
    'Anambra East',
    'Anambra West',
    'Anaocha',
    'Awka North',
    'Awka South',
    'Ayamelum',
    'Dunukofia',
    'Ekwusigo',
    'Idemili North',
    'Idemili South',
    'Ihiala',
    'Njikoka',
    'Nnewi North',
    'Nnewi South',
    'Ogbaru',
    'Onitsha North',
    'Onitsha South',
    'Orumba North',
    'Orumba South',
    'Oyi',
  ],
  'Bauchi State': [
    'Alkaleri',
    'Bauchi',
    'Bogoro',
    'Damban',
    'Darazo',
    'Dass',
    'Gamawa',
    'Ganjuwa',
    'Giade',
    'Itas-Gadau',
    'Jama are',
    'Katagum',
    'Kirfi',
    'Misau',
    'Ningi',
    'Shira',
    'Tafawa Balewa',
    ' Toro',
    ' Warji',
    ' Zaki',
  ],

  'Bayelsa State': [
    'Brass',
    'Ekeremor',
    'Kolokuma Opokuma',
    'Nembe',
    'Ogbia',
    'Sagbama',
    'Southern Ijaw',
    'Yenagoa',
  ],
  'Benue State': [
    'Agatu',
    'Apa',
    'Ado',
    'Buruku',
    'Gboko',
    'Guma',
    'Gwer East',
    'Gwer West',
    'Katsina-Ala',
    'Konshisha',
    'Kwande',
    'Logo',
    'Makurdi',
    'Obi',
    'Ogbadibo',
    'Ohimini',
    'Oju',
    'Okpokwu',
    'Oturkpo',
    'Tarka',
    'Ukum',
    'Ushongo',
    'Vandeikya',
  ],
  'Borno State': [
    'Abadam',
    'Askira-Uba',
    'Bama',
    'Bayo',
    'Biu',
    'Chibok',
    'Damboa',
    'Dikwa',
    'Gubio',
    'Guzamala',
    'Gwoza',
    'Hawul',
    'Jere',
    'Kaga',
    'Kala-Balge',
    'Konduga',
    'Kukawa',
    'Kwaya Kusar',
    'Mafa',
    'Magumeri',
    'Maiduguri',
    'Marte',
    'Mobbar',
    'Monguno',
    'Ngala',
    'Nganzai',
    'Shani',
  ],
  'Cross River State': [
    'Abi',
    'Akamkpa',
    'Akpabuyo',
    'Bakassi',
    'Bekwarra',
    'Biase',
    'Boki',
    'Calabar Municipal',
    'Calabar South',
    'Etung',
    'Ikom',
    'Obanliku',
    'Obubra',
    'Obudu',
    'Odukpani',
    'Ogoja',
    'Yakuur',
    'Yala',
  ],

  'Delta State': [
    'Aniocha North',
    'Aniocha South',
    'Bomadi',
    'Burutu',
    'Ethiope East',
    'Ethiope West',
    'Ika North East',
    'Ika South',
    'Isoko North',
    'Isoko South',
    'Ndokwa East',
    'Ndokwa West',
    'Okpe',
    'Oshimili North',
    'Oshimili South',
    'Patani',
    'Sapele',
    'Udu',
    'Ughelli North',
    'Ughelli South',
    'Ukwuani',
    'Uvwie',
    'Warri North',
    'Warri South',
    'Warri South West',
  ],

  'Ebonyi State': [
    'Abakaliki',
    'Afikpo North',
    'Afikpo South',
    'Ebonyi',
    'Ezza North',
    'Ezza South',
    'Ikwo',
    'Ishielu',
    'Ivo',
    'Izzi',
    'Ohaozara',
    'Ohaukwu',
    'Onicha',
  ],
  'Edo State': [
    'Akoko-Edo',
    'Egor',
    'Esan Central',
    'Esan North-East',
    'Esan South-East',
    'Esan West',
    'Etsako Central',
    'Etsako East',
    'Etsako West',
    'Igueben',
    'Ikpoba Okha',
    'Orhionmwon',
    'Oredo',
    'Ovia North-East',
    'Ovia South-West',
    'Owan East',
    'Owan West',
    'Uhunmwonde',
  ],

  'Ekiti State': [
    'Ado Ekiti',
    'Efon',
    'Ekiti East',
    'Ekiti South-West',
    'Ekiti West',
    'Emure',
    'Gbonyin',
    'Ido Osi',
    'Ijero',
    'Ikere',
    'Ikole',
    'Ilejemeje',
    'Irepodun-Ifelodun',
    'Ise-Orun',
    'Moba',
    'Oye',
  ],
  Rivers: [
    'Abua–Odual',
    'Ahoada East',
    'Ahoada West',
    'Akuku-Toru',
    'Andoni',
    'Asari-Toru',
    'Bonny',
    'Degema',
    'Emohua',
    'Eleme',
    'Etche',
    'Gokana',
    'Ikwerre',
    'Khana',
    'Obio-Akpor',
    'Ogba–Egbema–Ndoni',
    'Ogu-Bolo',
    'Okrika',
    'Omuma',
    'Opobo–Nkoro',
    'Oyigbo',
    'Port Harcourt',
    'Tai',
  ],
  'Enugu State': [
    'Aninri',
    'Awgu',
    'Enugu East',
    'Enugu North',
    'Enugu South',
    'Ezeagu',
    'Igbo Etiti',
    'Igbo Eze North',
    'Igbo Eze South',
    'Isi Uzo',
    'Nkanu East',
    'Nkanu West',
    'Nsukka',
    'Oji River',
    'Udenu',
    'Udi',
    'Uzo Uwani',
  ],
  'Federal Capital Territory': [
    'Abaji',
    'Bwari',
    'Gwagwalada',
    'Kuje',
    'Kwali',
    'Municipal Area Council',
  ],
  'Gombe State': [
    'Akko',
    'Balanga',
    'Billiri',
    'Dukku',
    'Funakaye',
    'Gombe',
    'Kaltungo',
    'Kwami',
    'Nafada',
    'Shongom',
    'Yamaltu-Deba',
  ],
  'Imo State': [
    'Aboh Mbaise',
    'Ahiazu Mbaise',
    'Ehime Mbano',
    'Ezinihitte',
    'Ideato North',
    'Ideato South',
    'Ihitte-Uboma',
    'Ikeduru',
    'Isiala Mbano',
    'Isu',
    'Mbaitoli',
    'Ngor Okpala',
    'Njaba',
    'Nkwerre',
    'Nwangele',
    'Obowo',
    'Oguta',
    'Ohaji-Egbema',
    'Okigwe',
    'Orlu',
    'Orsu',
    'Oru East',
    'Oru West',
    'Owerri Municipal',
    'Owerri North',
    'Owerri West',
    'Unuimo',
  ],
  'Jigawa State': [
    'Auyo',
    'Babura',
    'Biriniwa',
    'Birnin Kudu',
    'Buji',
    'Dutse',
    'Gagarawa',
    'Garki',
    'Gumel',
    'Guri',
    'Gwaram',
    'Gwiwa',
    'Hadejia',
    'Jahun',
    'Kafin Hausa',
    'Kazaure',
    'Kiri Kasama',
    'Kiyawa',
    'Kaugama',
    'Maigatari',
    'Malam Madori',
    'Miga',
    'Ringim',
    'Roni',
    'Sule Tankarkar',
    'Taura',
    'Yankwashi',
  ],
  'Kaduna State': [
    'Birnin Gwari',
    'Chikun',
    'Giwa',
    'Igabi',
    'Ikara',
    'Jaba',
    'Jema a',
    'Kachia',
    'Kaduna North',
    'Kaduna South',
    'Kagarko',
    'Kajuru',
    'Kaura',
    'Kauru',
    'Kubau',
    'Kudan',
    'Lere',
    'Makarfi',
    'Sabon Gari',
    'Sanga',
    'Soba',
    'Zangon Kataf',
    'Zaria',
  ],
  'Kano State': [
    'Ajingi',
    'Albasu',
    'Bagwai',
    'Bebeji',
    'Bichi',
    'Bunkure',
    'Dala',
    'Dambatta',
    'Dawakin Kudu',
    'Dawakin Tofa',
    'Doguwa',
    'Fagge',
    'Gabasawa',
    'Garko',
    'Garun Mallam',
    'Gaya',
    'Gezawa',
    'Gwale',
    'Gwarzo',
    'Kabo',
    'Kano Municipal',
    'Karaye',
    'Kibiya',
    'Kiru',
    'Kumbotso',
    'Kunchi',
    'Kura',
    'Madobi',
    'Makoda',
    'Minjibir',
    'Nasarawa',
    'Rano',
    'Rimin Gado',
    'Rogo',
    'Shanono',
    'Sumaila',
    'Takai',
    'Tarauni',
    'Tofa',
    'Tsanyawa',
    'Tudun Wada',
    'Ungogo',
    'Warawa',
    'Wudil',
  ],
  'Katsina State': [
    'Bakori',
    'Batagarawa',
    'Batsari',
    'Baure',
    'Bindawa',
    'Charanchi',
    'Dandume',
    'Danja',
    'Dan Musa',
    'Daura',
    'Dutsi',
    'Dutsin Ma',
    'Faskari',
    'Funtua',
    'Ingawa',
    'Jibia',
    'Kafur',
    'Kaita',
    'Kankara',
    'Kankia',
    'Katsina',
    'Kurfi',
    'Kusada',
    'Mai Adua',
    'Malumfashi',
    'Mani',
    'Mashi',
    'Matazu',
    'Musawa',
    'Rimi',
    'Sabuwa',
    'Safana',
    'Sandamu',
    'Zango',
  ],
  'Kebbi State': [
    'Aleiro',
    'Arewa Dandi',
    'Argungu',
    'Augie',
    'Bagudo',
    'Birnin Kebbi',
    'Bunza',
    'Dandi',
    'Fakai',
    'Gwandu',
    'Jega',
    'Kalgo',
    'Koko Besse',
    'Maiyama',
    'Ngaski',
    'Sakaba',
    'Shanga',
    'Suru',
    'Wasagu Danko',
    'Yauri',
    'Zuru',
  ],
  'Kogi State': [
    'Adavi',
    'Ajaokuta',
    'Ankpa',
    'Bassa',
    'Dekina',
    'Ibaji',
    'Idah',
    'Igalamela Odolu',
    'Ijumu',
    'Kabba Bunu',
    'Kogi',
    'Lokoja',
    'Mopa Muro',
    'Ofu',
    'Ogori Magongo',
    'Okehi',
    'Okene',
    'Olamaboro',
    'Omala',
    'Yagba East',
    'Yagba West',
  ],
  'Kwara State': [
    'Asa',
    'Baruten',
    'Edu',
    'Ekiti',
    'Ifelodun',
    'Ilorin East',
    'Ilorin South',
    'Ilorin West',
    'Irepodun',
    'Isin',
    'Kaiama',
    'Moro',
    'Offa',
    'Oke Ero',
    'Oyun',
    'Pategi',
  ],
  'Lagos State': [
    'Agege',
    'Ajeromi-Ifelodun',
    'Alimosho',
    'Amuwo-Odofin',
    'Apapa',
    'Badagry',
    'Epe',
    'Eti Osa',
    'Ibeju-Lekki',
    'Ifako-Ijaiye',
    'Ikeja',
    'Ikorodu',
    'Kosofe',
    'Lagos Island',
    'Lagos Mainland',
    'Mushin',
    'Ojo',
    'Oshodi-Isolo',
    'Shomolu',
    'Surulere',
  ],
  'Nasarawa State': [
    'Akwanga',
    'Awe',
    'Doma',
    'Karu',
    'Keana',
    'Keffi',
    'Kokona',
    'Lafia',
    'Nasarawa',
    'Nasarawa Egon',
    'Obi',
    'Toto',
    'Wamba',
  ],
  'Niger State': [
    'Agaie',
    'Agwara',
    'Bida',
    'Borgu',
    'Bosso',
    'Chanchaga',
    'Edati',
    'Gbako',
    'Gurara',
    'Katcha',
    'Kontagora',
    'Lapai',
    'Lavun',
    'Magama',
    'Mariga',
    'Mashegu',
    'Mokwa',
    'Moya',
    'Paikoro',
    'Rafi',
    'Rijau',
    'Shiroro',
    'Suleja',
    'Tafa',
    'Wushishi',
  ],
  'Ogun State': [
    'Abeokuta North',
    'Abeokuta South',
    'Ado-Odo Ota',
    'Egbado North',
    'Egbado South',
    'Ewekoro',
    'Ifo',
    'Ijebu East',
    'Ijebu North',
    'Ijebu North East',
    'Ijebu Ode',
    'Ikenne',
    'Imeko Afon',
    'Ipokia',
    'Obafemi Owode',
    'Odeda',
    'Odogbolu',
    'Ogun Waterside',
    'Remo North',
    'Shagamu',
  ],
  'Ondo State': [
    'Akoko North-East',
    'Akoko North-West',
    'Akoko South-West',
    'Akoko South-East',
    'Akure North',
    'Akure South',
    'Ese Odo',
    'Idanre',
    'Ifedore',
    'Ilaje',
    'Ile Oluji-Okeigbo',
    'Irele',
    'Odigbo',
    'Okitipupa',
    'Ondo East',
    'Ondo West',
    'Ose',
    'Owo',
  ],
  'Osun State': [
    'Atakunmosa East',
    'Atakunmosa West',
    'Aiyedaade',
    'Aiyedire',
    'Boluwaduro',
    'Boripe',
    'Ede North',
    'Ede South',
    'Ife Central',
    'Ife East',
    'Ife North',
    'Ife South',
    'Egbedore',
    'Ejigbo',
    'Ifedayo',
    'Ifelodun',
    'Ila',
    'Ilesa East',
    'Ilesa West',
    'Irepodun',
    'Irewole',
    'Isokan',
    'Iwo',
    'Obokun',
    'Odo Otin',
    'Ola Oluwa',
    'Olorunda',
    'Oriade',
    'Orolu',
    'Osogbo',
  ],
  'Oyo State': [
    'Afijio',
    'Akinyele',
    'Atiba',
    'Atisbo',
    'Egbeda',
    'Ibadan North',
    'Ibadan North-East',
    'Ibadan North-West',
    'Ibadan South-East',
    'Ibadan South-West',
    'Ibarapa Central',
    'Ibarapa East',
    'Ibarapa North',
    'Ido',
    'Irepo',
    'Iseyin',
    'Itesiwaju',
    'Iwajowa',
    'Kajola',
    'Lagelu',
    'Ogbomosho North',
    'Ogbomosho South',
    'Ogo Oluwa',
    'Olorunsogo',
    'Oluyole',
    'Ona Ara',
    'Orelope',
    'Ori Ire',
    'Oyo',
    'Oyo East',
    'Saki East',
    'Saki West',
    'Surulere',
  ],
  'Plateau State': [
    'Bokkos',
    'Barkin Ladi',
    'Bassa',
    'Jos East',
    'Jos North',
    'Jos South',
    'Kanam',
    'Kanke',
    'Langtang South',
    'Langtang North',
    'Mangu',
    'Mikang',
    'Pankshin',
    'Qua an Pan',
    'Riyom',
    'Shendam',
    'Wase',
  ],
  'Sokoto State': [
    'Binji',
    'Bodinga',
    'Dange Shuni',
    'Gada',
    'Goronyo',
    'Gudu',
    'Gwadabawa',
    'Illela',
    'Isa',
    'Kebbe',
    'Kware',
    'Rabah',
    'Sabon Birni',
    'Shagari',
    'Silame',
    'Sokoto North',
    'Sokoto South',
    'Tambuwal',
    'Tangaza',
    'Tureta',
    'Wamako',
    'Wurno',
    'Yabo',
  ],
  'Taraba State': [
    'Ardo Kola',
    'Bali',
    'Donga',
    'Gashaka',
    'Gassol',
    'Ibi',
    'Jalingo',
    'Karim Lamido',
    'Kumi',
    'Lau',
    'Sardauna',
    'Takum',
    'Ussa',
    'Wukari',
    'Yorro',
    'Zing',
  ],
  'Yobe State': [
    'Bade',
    'Bursari',
    'Damaturu',
    'Fika',
    'Fune',
    'Geidam',
    'Gujba',
    'Gulani',
    'Jakusko',
    'Karasuwa',
    'Machina',
    'Nangere',
    'Nguru',
    'Potiskum',
    'Tarmuwa',
    'Yunusari',
    'Yusufari',
  ],
  'Zamfara State': [
    'Anka',
    'Bakura',
    'Birnin Magaji Kiyaw',
    'Bukkuyum',
    'Bungudu',
    'Gummi',
    'Gusau',
    'Kaura Namoda',
    'Maradun',
    'Maru',
    'Shinkafi',
    'Talata Mafara',
    'Chafe',
    'Zurmi',
  ],
}

export const degree = [
  { key: 'SSCE', value: 'SSCE' },
  { key: 'OND', value: 'OND' },
  { key: 'NCE', value: 'NCE' },
  { key: 'HND', value: 'HND' },
  { key: 'BACHELORS', value: 'BACHELORS' },
  { key: 'MASTERS', value: 'MASTERS' },
  { key: 'DOCTORATE', value: 'DOCTORATE' },
]

export const months = [
  { key: 'jan', value: 'January' },
  { key: 'feb', value: 'February' },
  { key: 'mar', value: 'March' },
  { key: 'apr', value: 'April' },
  { key: 'may', value: 'May' },
  { key: 'jun', value: 'June' },
  { key: 'jul', value: 'July' },
  { key: 'aug', value: 'August' },
  { key: 'sep', value: 'September' },
  { key: 'oct', value: 'October' },
  { key: 'nov', value: 'November' },
  { key: 'dec', value: 'December' },
]
export const exp = [
  { key: 'entry', value: 'Entry level' },
  { key: 'mid', value: 'Mid level' },
  { key: 'senior', value: 'Senior level' },
]
export const expL = [
  { key: 'less than 1', value: 'less than a year' },
  { key: '1', value: '1 years' },
  { key: '2', value: '2 years' },
  { key: '3', value: '3 years' },
  { key: '4', value: '4 years' },
  { key: '5+', value: '5+ years' },
]
export const mode = [
  { key: 'in-person', value: 'in-person' },
  { key: 'virtual', value: 'virtual' },
]

export const accessData = [
  'Personality',
  'Cultural fit',
  'Critical thinking',
  'Digital Literacy',
  'Communication',
  'Subject knowledge',
  'Apperance',
  'Leadership',
  'Curriculum Knowledge',
  'Passion for teaching',
  'Lesson plan creation',
]

export const AdministratorHire = [
  {
    key: 'Principal',
    value: 'Principal',
  },
  {
    key: 'Head of School',
    value: 'Head of School',
  },
  {
    key: 'Vice Principal',
    value: 'Vice Principal',
  },
  {
    key: 'Vice Principal Academics',
    value: 'Vice Principal Academics',
  },
  {
    key: 'Vice Principal Admin',
    value: 'Vice Principal Admin',
  },
  {
    key: 'School Nurse',
    value: 'School Nurse',
  },
  {
    key: 'Office Assistant',
    value: 'Office Assistant',
  },
  {
    key: 'Class Assistant',
    value: 'Class Assistant',
  },
  {
    key: 'Security Personnel',
    value: 'Security Personnel',
  },
  {
    key: 'Accountant',
    value: 'Accountant',
  },
  {
    key: 'Care giver / Minder',
    value: 'Care giver / Minder',
  },
  {
    key: 'Cleaner',
    value: 'Cleaner',
  },
]

export const teacherHire = [
  { label: 'Primary School', value: 'Primary School' },
  { label: 'Junior Secondary School', value: 'Junior Secondary School' },
  { label: 'Senior Secondary School', value: 'Senior Secondary School' },
]
