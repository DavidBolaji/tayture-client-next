// Defining the structure of a blog post
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  hor_image_src: string;
  ver_image_src: string;
  category: string;
  likes: number;
  comments: number;
  category_text_hoverBg_color: string;
  category_bg_color: string;
  is_editors_pick: boolean;
  is_k12_centered: boolean;
  is_must_read: boolean;
  is_popular_post: boolean;
  is_main_article: boolean;
}

// Function to calculate category colors based on category name
function getCategoryColors(
  category: string,
): [textColor: string, bgColor: string] {
  switch (category) {
    case 'Admins':
      return ['#EAB308', '#FEF9C3'];
    case 'Educators':
      return ['#EF4444', '#FEE2E2'];
    case 'Pupils':
      return ['rgb(55 48 163)', '#FEF9C3'];
    case 'Parents':
      return ['#EC4899', '#FFEAF5'];
    case 'Events':
      return ['#779A4A', '#EEFFD8'];
    default:
      return ['black', 'rgb(242,242,242)'];
  }
}

// Function to generate random numbers between 5 and 30
function getRandomNumber(): number {
  return (Math.floor(Math.random() * (30 - 5 + 1)) + 5)
}

// function to return an array of any amount of random numbers between min and max
function generateUniqueRandomNumbers(
  length: number,
  min: number,
  max: number,
): number[] {
  const randomNumbers: number[] = []
  const generatedNumbers: Set<number> = new Set()

  // Generate unique random numbers until the desired length is reached
  while (randomNumbers.length < length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    if (!generatedNumbers.has(randomNumber)) {
      generatedNumbers.add(randomNumber)
      randomNumbers.push(randomNumber)
    }
  }

  return randomNumbers
}

function updateMainArticleForCategory(
  mockBlogs: BlogPost[],
  category: string,
): void {
  // Filter blog posts with the specified category set to true
  const categoryBlogs = mockBlogs.filter((blog) => blog[category])

  // Find the blog post with the highest number of likes among the categoryBlogs
  const highestLikesBlog = categoryBlogs.reduce((prevBlog, currentBlog) => {
    return prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog
  })

  // Update the is_main_article property of the blog with the highest likes to true in the original mockBlogs array
  mockBlogs.forEach((blog) => {
    if (blog.id === highestLikesBlog.id) {
      blog.is_main_article = true
    }
  })
}

const mockBlogs: BlogPost[] = [
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/media-star-reviews-laptop-fans_482257-81654.jpg?t=st=1713302176~exp=1713305776~hmac=9910de778887cf2b3ee1363458dc99c68f1abb9d29824864f8d28ad3da4792ba&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/industrial-designer-working-3d-model_23-2149370097.jpg?t=st=1713302227~exp=1713305827~hmac=43cdd2e0a3f62eeaaa9daaa8cf1be7c4b877c12fe628a615f43d6e13930847a1&w=360',
    category: 'Admins',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/african-woman-teaching-children-class_23-2148892568.jpg?t=st=1713303754~exp=1713307354~hmac=eec7956a7cb703fd930c61f95301053958bcd001daefb926b90bd9f87bc593d5&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/woman-teaching-kids-class_23-2148892552.jpg?t=st=1713303900~exp=1713307500~hmac=ffd4d0250d2fdb0f75e447ccb332ff47ec3864d2dae0828a8f4b5d61a884f726&w=360',
    category: 'Educators',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/front-view-kid-doing-homework_23-2149610742.jpg?t=st=1712843045~exp=1712846645~hmac=255d35bf764718bb1864a29615708666ff743c47584a097c64569468025cde32&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/young-girls-spending-time-home_23-2149489564.jpg?t=st=1713304448~exp=1713308048~hmac=4d6c7075127bd8b1561d121116db10b1752fa9f776b7d106f4eb26e3f3bcc2c3&w=360',
    category: 'Pupils',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/medium-shot-happy-family-home_23-2149160319.jpg?t=st=1713310298~exp=1713313898~hmac=ab1fa8e5f9c1631c865dcdff2909b7a0cd3d5bb7c26b7754d7ca3930fdeb5504&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/medium-shot-family-together-home_23-2149160316.jpg?t=st=1713310160~exp=1713313760~hmac=8f8fadca584548d28688013a80b4e12a11961e4700477f184b0b571ffe2bab1e&w=360',
    category: 'Parents',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/group-business-women-participating-panel-discussion_53876-26298.jpg?t=st=1713393889~exp=1713397489~hmac=13caff07ca263f33fd73c5b0cd7f716e5f849cba59a5eee371d3d501acf81590&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/full-shot-people-correcting-grammar-mistakes_23-2150171159.jpg?t=st=1713310607~exp=1713314207~hmac=101954df015e0f3dcd7c176e4ccd34eadac8e0cec3bd2f228b330c89d378d200&w=360',
    category: 'Events',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/entrepreneur-analyzing-marketing-statistics-working-financial-growth-report-hours-startup-office-african-american-workers-planning-company-strategy-increase-business-profit_482257-66469.jpg?t=st=1713302279~exp=1713305879~hmac=6e73e7284f4b46e8c198f1c66154931a18dcffcd2685dfd4e766f49fed901c3a&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/portrait-african-young-businesswoman-holding-mobile-phone-hand-looking-away_23-2148190733.jpg?t=st=1713113376~exp=1713116976~hmac=dc4ebdf1082c96f828a5138bf6f588d50a2a78944491e293b9fbee4dc77c7b18&w=360',
    category: 'Admins',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/study-group-african-people_23-2149156377.jpg?t=st=1713303964~exp=1713307564~hmac=7b6cd4148cf4089d8214f050396347dc514dbfe9613d18caea5c23022dd7a628&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/smiling-student-posing-library_23-2147663478.jpg?t=st=1713304281~exp=1713307881~hmac=9d11a82d2cf32df0e788d01b96cca0f7c3bc5c8d38fbb3878248558fa93a8fc2&w=360',
    category: 'Educators',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/shallow-focus-shot-african-child-learning-school_181624-36498.jpg?t=st=1713309894~exp=1713313494~hmac=f7a8caa0b75e7bec7dae2bc7d8cab9a8d7c347fe62a96204c2e572e6998d9cc6&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/boy-looking-attentively-tablet-sitting-table_259150-59532.jpg?t=st=1713309833~exp=1713313433~hmac=8bec83eaf4d4eec13b3bff7a33b41a74b9002c5a04426a9f78ee84c514d42c90&w=360',
    category: 'Pupils',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/medium-shot-kid-painting-wood_23-2148931078.jpg?t=st=1713310070~exp=1713313670~hmac=33e99d46eacbe5c71fff70f2d05dc4232e3685de16dfc35642757503cb1aac57&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/medium-shot-community-painting-wood_23-2148931121.jpg?t=st=1713310411~exp=1713314011~hmac=1f69368618b116ae085b6e662a9d322ba239b71251d615411e999fe775079bfe&w=360',
    category: 'Parents',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
  {
    id: 0,
    title:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, accusantium?',
    content:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, minus veritatis omnis debitis ad facilis optio recusandae facere expedita rerum ab cum maiores dolorum repellat vel! Ratione sunt illo culpa!Eum, voluptate culpa harum voluptates repellendus perspiciatis dolor quaerat autem laborum porro veniam nobis odio sed quam ducimus sapiente hic fuga rerum nam ipsum quasi minus cupiditate eligendi vitae. Commodi.Explicabo labore corrupti blanditiis nemo aperiam veritatis doloribus! Deleniti nesciunt fugit, nemo, officiis aut libero harum voluptates dicta debitis aliquam, accusamus esse! Assumenda deleniti temporibus id. Laboriosam illum ipsam dicta?At aliquid, veniam saepe eveniet aut beatae accusantium non dicta modi explicabo, repellat in, nemo doloremque magni. Quibusdam a fugiat culpa similique. Veritatis praesentium nemo natus odio ipsam, obcaecati modi!Mollitia numquam totam officia id nulla inventore, ex sit maiores praesentium harum optio dicta incidunt fugiat itaque, aliquid quo. Dignissimos, dolore. Voluptate, amet velit? Nisi atque fuga nulla quibusdam totam.Perferendis minus consectetur inventore magnam modi quod adipisci sint, consequuntur iure dolor esse ex maxime itaque eaque, quos cumque voluptatem, mollitia veritatis corrupti eligendi sequi. Vel quos magnam quas vero.Nam, ab porro. Unde numquam earum aliquid optio quasi hic ut architecto illum. Atque, ipsum id eveniet fugiat reiciendis aut, facilis ab quidem qui, veritatis dolorum. Maxime illum doloribus molestiae.Dignissimos consequatur sunt deleniti corrupti, natus repellendus laboriosam molestias doloribus ducimus rerum quos tempora eos explicabo nisi sed modi! Itaque ratione architecto, ipsam officia magnam molestias distinctio at atque cupiditate!Saepe dolorem tempora cupiditate, quaerat soluta, non nihil odio consequuntur autem temporibus odit! Eius fugiat iusto laborum. Velit maiores sapiente sequi, incidunt itaque sunt possimus ipsum quod debitis veritatis reprehenderit.At officia praesentium necessitatibus veniam optio quis eligendi exercitationem quia cum alias? Est cumque in sit quia harum dignissimos aspernatur qui iste sapiente officia impedit rerum, quo vitae, unde aliquam?  ',
    author: 'Tayture',
    date: `April 12, 2024`,
    hor_image_src:
      'https://img.freepik.com/free-photo/people-office-work-day_23-2150690129.jpg?t=st=1713310852~exp=1713314452~hmac=346562b118367db394b2bb8e69eb8de310eb31d3209040ebe86d1b15d18fdaff&w=996',
    ver_image_src:
      'https://img.freepik.com/free-photo/people-office-work-day_23-2150690134.jpg?t=st=1713310947~exp=1713314547~hmac=c16a296e3d7fce07fa147e9bd52f4d920b0b3e4260f6a9266f5b4d3de9638c64&w=360',
    category: 'Events',
    likes: getRandomNumber(),
    comments: getRandomNumber(),
    category_text_hoverBg_color: '',
    category_bg_color: '',
    is_editors_pick: false,
    is_k12_centered: false,
    is_must_read: false,
    is_popular_post: false,
    is_main_article: false,
  },
]

const k12_centered = generateUniqueRandomNumbers(4, 1, 11)

// Mapping over the mockBlogs array to compute colors,index,set values dynamically
mockBlogs.forEach((blog, index) => {
  const [textColor, bgColor] = getCategoryColors(blog.category)
  blog.category_text_hoverBg_color = textColor
  blog.category_bg_color = bgColor
  blog.id = index + 1
  blog.id % 2 === 0 ? (blog.is_editors_pick = true) : (blog.is_must_read = true)
  k12_centered.map((num) => {
    blog.id === num ? (blog.is_k12_centered = true) : ''
  })
  blog.likes > 10
    ? (blog.is_popular_post = true)
    : (blog.is_popular_post = false)
})


updateMainArticleForCategory(mockBlogs, 'is_k12_centered')
updateMainArticleForCategory(mockBlogs, 'is_must_read')


// Function to fetch blogs from the mock database
const FetchBlogs = (): BlogPost[] => {
  return mockBlogs;
}

export default FetchBlogs;
