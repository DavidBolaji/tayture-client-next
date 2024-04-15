// Defining the structure of a blog post
interface BlogPost {
  id: number
  title: string
  content: string
  author: string
  date: string
  hor_image_src: string
  ver_image_src: string
  category: string
  likes: string
  comments: string
  category_text_hoverBg_color: string
  category_bg_color: string
}

// Function to calculate category colors based on category name
function getCategoryColors(category: string): [string, string] {
  switch (category) {
    case 'Admins':
      return ['A', 'B']
    case 'Educators':
      return ['C', 'D']
    case 'Pupils':
      return ['E', 'F']
    case 'Parents':
      return ['G', 'H']
    case 'Event':
      return ['I', 'J']
    default:
      return ['default-text-color', 'default-bg-color']
  }
}

// Function to generate random numbers between 5 and 30 
function getRandomNumber(): number {
    return Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  }


const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam velit omnis quae perferendis praesentium magni fugiat, harum numquam dignissimos reiciendis a, deserunt distinctio iste maxime nulla dolor itaque explicabo? Magni!',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src: '',
    ver_image_src: '',
    category: 'Admins',
    likes: `${getRandomNumber()}`,
    comments: `${getRandomNumber()}`,
    category_text_hoverBg_color: '',
    category_bg_color: '',
  },
]

// Mapping over the mockBlogs array to compute colors dynamically
mockBlogs.forEach((blog) => {
  const [textColor, bgColor] = getCategoryColors(blog.category)
  blog.category_text_hoverBg_color = textColor
  blog.category_bg_color = bgColor
})

// Function to fetch blogs from the mock database
const FetchBlogs = (): BlogPost[] => {
  return mockBlogs
}

export default FetchBlogs
