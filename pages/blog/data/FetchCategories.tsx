// Defining the structure of a blog post
interface CategoryDetails {
  id: number
  category: string
  image_src: string
  category_color: string
  tag_bg_color: string
  rank?: number
  tot_articles: number
}

// Function to calculate category colors based on category name
function getCategoryColors(
  category: string,
): [textColor: string, bgColor: string] {
  switch (category) {
    case 'Admins':
      return ['#EAB308', '#FEF9C3']
    case 'Educators':
      return ['#EF4444', '#FEE2E2']
    case 'Pupils':
      return ['rgb(55 48 163)', '#FEF9C3']
    case 'Parents':
      return ['#EC4899', '#FFEAF5']
    case 'Events':
      return ['#779A4A', '#EEFFD8']
    default:
      return ['black', 'rgb(242,242,242)']
  }
}

const Categories: CategoryDetails[] = [
  {
    id: 0,
    image_src:
      'url(https://img.freepik.com/free-photo/entrepreneurs-meeting-office_23-2148898688.jpg?t=st=1712831917~exp=1712835517~hmac=d3e6c62789e340457130f14c892e245e2ef8c4512b82811c35b14a24a7067daf&w=996)',
    category: 'Admins',
    category_color: '',
    rank: 1,
    tot_articles: 20,
    tag_bg_color: '',
  },
  {
    id: 0,
    image_src:
      'url(https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-white-board_23-2149272221.jpg?t=st=1712842359~exp=1712845959~hmac=84e9b41ce746cc752babc2926fce09ad0cbbcbc874c4f2d5d43eea19bf34aee6&w=996)',
    category: 'Educators',
    category_color: '',
    rank: 2,
    tot_articles: 18,
    tag_bg_color: '',
  },
  {
    id: 0,
    image_src:
      'url(https://img.freepik.com/free-photo/front-view-kid-doing-homework_23-2149610742.jpg?t=st=1712843045~exp=1712846645~hmac=255d35bf764718bb1864a29615708666ff743c47584a097c64569468025cde32&w=996)',
    category: 'Pupils',
    category_color: '',
    rank: 3,
    tot_articles: 15,
    tag_bg_color: '',
  },
  {
    id: 0,
    image_src:
      'url(https://img.freepik.com/free-photo/medium-shot-happy-parents-girl_23-2148960586.jpg?t=st=1712843236~exp=1712846836~hmac=07be2995070489fcd7c2bfd1fd7478b5f955c7e6b3a1dbeb692eb84c18d2a136&w=996)',
    category: 'Parents',
    category_color: '',
    rank: 0,
    tot_articles: 10,
    tag_bg_color: '',
  },
  {
    id: 0,
    image_src:
      'url(https://img.freepik.com/free-photo/portrait-elegant-professional-businessman-speaking-conference_23-2150917212.jpg?t=st=1712843534~exp=1712847134~hmac=32fdc9959a700b0f44530679b47b24c93de6fc7bec1224bdd6c7c580a00de2ea&w=740)',
    category: 'Events',
    category_color: '',
    rank: 0,
    tot_articles: 10,
    tag_bg_color: '',
  },
]

// Mapping over the mockBlogs array to compute colors dynamically
Categories.forEach((category, index) => {
  const [catTextColor, tagBgColor] = getCategoryColors(category.category)
  category.category_color = catTextColor
  category.tag_bg_color = tagBgColor
  category.id = index + 1
})

// Function to fetch blogs from the mock database
const FetchCategories = (): CategoryDetails[] => {
  return Categories
}

export default FetchCategories
