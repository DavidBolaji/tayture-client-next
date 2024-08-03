import React from 'react'
import HeadingDesc from '../HeadingDesc'
import { IoMdArrowForward } from 'react-icons/io'
import Wrapper from '@/components/Wrapper/Wrapper'
import InputWithIcon from './InputWithIcon'

function NewsletterSection() {
  return (
    <Wrapper>
      <div className="SubscribeCont relative flex flex-col lg:flex-row items-center pb-[100px] sm:pt-0 pt-[100px]">
        {/* Left side */}
        <div className=" TextAndForm flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
          {/* Heading and Description */}
          <HeadingDesc
            heading="Join our newsletter"
            description="Read and share new perspectives on just about any topic"
          />

          {/* Listed content */}
          <ul className="space-y-5 mt-10">
            <li className="flex items-center space-x-4">
              <span className="nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-black bg-neutral-300  ">
                01
              </span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Receive notifications for insightful articles
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <span className="nc-Badge  inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative text-orange bg-[#FFDDC3]  ">
                02
              </span>
              <span className="font-medium text-neutral-700">
                Stay updated with relavant contents
              </span>
            </li>
          </ul>

          {/*Form */}
          <InputWithIcon Search_Arrow='Arrow' is_sm = {false} placeholder='Email'/>
        </div>

        {/* Right side */}
        <div className="flex-grow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 1080 1080"
            viewBox="0 0 1080 1080"
            id="Onlinelearningconcept"
          >
            <path
              fill="#f7f7f7"
              d="M1035 1065H53c-6.6 0-12-5.4-12-12v-47c0-6.6 5.4-12 12-12h982c6.6 0 12 5.4 12 12v47c0 6.6-5.4 12-12 12z"
              className="colorf7f7f7 svgShape"
            ></path>
            <circle
              cx="552"
              cy="677"
              r="334"
              fill="#fffaf3"
              className="colorf3faff svgShape"
            ></circle>
            <path
              fill="#ffa005"
              d="M966 912.9c7.1-18.1 14.3-38.2 7.6-56.4-1.6-4.4-4.1-9.1-2.6-13.6 2-6.1 10-8.2 12.6-14 3-6.4-1.7-13.8-.5-20.7 1.2-7 8.1-11.6 14.8-14.1 6.7-2.5 14-4.1 19.4-8.7 10.3-9 9.1-25.1 6.8-38.7-2.3-13.5-4-29.5 5.9-39-18.2 3.5-36.8 7.1-52.6 16.7S949 751 949.9 769.5c.5 9.3 4.1 19.2-.1 27.4-4.6 8.9-16.9 12.4-20 21.9-3.6 10.9 7.1 20.9 11.3 31.6 4 10.1 2.1 21.4 3 32.1.9 10.8 6.5 23 17.2 24.6l4.7 5.8z"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffffff"
              d="M966 912.9c7.1-18.1 14.3-38.2 7.6-56.4-1.6-4.4-4.1-9.1-2.6-13.6 2-6.1 10-8.2 12.6-14 3-6.4-1.7-13.8-.5-20.7 1.2-7 8.1-11.6 14.8-14.1 6.7-2.5 14-4.1 19.4-8.7 10.3-9 9.1-25.1 6.8-38.7-2.3-13.5-4-29.5 5.9-39-18.2 3.5-36.8 7.1-52.6 16.7S949 751 949.9 769.5c.5 9.3 4.1 19.2-.1 27.4-4.6 8.9-16.9 12.4-20 21.9-3.6 10.9 7.1 20.9 11.3 31.6 4 10.1 2.1 21.4 3 32.1.9 10.8 6.5 23 17.2 24.6l4.7 5.8z"
              opacity=".31"
              className="colorffffff svgShape"
            ></path>
            <path
              fill="none"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width=".75"
              d="M958.7 889.2c-.2-52.6 10-162.7 70.7-181.1"
              className="colorStrokeffffff svgStroke"
            ></path>
            <path
              fill="#ffa005"
              d="M923.7 908.5c-10.8-20.2-22-42.7-16.7-65 1.3-5.4 3.5-11.2 1.2-16.3-3.1-6.8-12.8-8.3-16.7-14.7-4.3-7 .1-16.4-2.3-24.3-2.4-8.1-11.1-12.4-19.2-14.5-8.1-2-16.9-2.8-23.9-7.6-13.3-9.1-14.1-28.2-13.3-44.3.8-16.1.6-35.1-12.3-44.8 21.8 1.6 44.1 3.3 63.9 12.4 19.8 9.1 37 27.3 38.4 49.1.7 10.9-2.2 23 3.9 32.1 6.6 9.8 21.5 12.2 26.5 22.9 5.7 12.3-5.4 25.4-8.9 38.5-3.2 12.3.5 25.3.9 38s-4.5 27.8-16.8 31.2l-4.7 7.3z"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="none"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width=".75"
              d="M929 879.7c-7-61.7-34-189.2-107.7-202.3"
              className="colorStrokeffffff svgStroke"
            ></path>
            <path
              fill="#ffeccc"
              d="M992 1027h-95c-6.6 0-12-5.4-12-12l-8-137c0-6.6 5.4-12 12-12h111c6.6 0 12 5.4 12 12l-8 137c0 6.6-5.4 12-12 12z"
              className="colorcce9ff svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M151 585.7h62v278h-62z"
              transform="rotate(-8.622 181.92 724.472)"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M181.8 583.4h31v278h-31z"
              transform="rotate(-8.622 197.24 722.15)"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffe8c2"
              d="m191.9 582.9-61.3 9.3 14.4-36.9 8.2-20.8 14 17.5z"
              className="colorffebc2 svgShape"
            ></path>
            <path
              fill="#4d4d4d"
              d="m167.2 552-22.2 3.3 8.2-20.8z"
              className="color0e538c svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M228.6 521.9h62v278h-62z"
              transform="matrix(.996 .08919 -.08919 .996 59.978 -20.52)"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M259.6 523.3h31v278h-31z"
              transform="matrix(.996 .08919 -.08919 .996 60.162 -21.892)"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffe8c2"
              d="m302.9 525.5-61.8-5.5 22.8-32.4 12.9-18.3 9.4 20.3z"
              className="colorffebc2 svgShape"
            ></path>
            <path
              fill="#4d4d4d"
              d="m286.2 489.6-22.3-2 12.9-18.3z"
              className="color0e538c svgShape"
            ></path>
            <path
              fill="#ffeccc"
              d="M343.5 1028H99.9L68 651h295z"
              className="colorcce9ff svgShape"
            ></path>
            <path
              fill="#ffeccc"
              d="M215.5 1028h128L363 651H215.5z"
              opacity=".5"
              className="colorcce9ff svgShape"
            ></path>
            <path
              fill="#ffe8c2"
              d="M269 921.6h619v85.1H269z"
              className="colorffebc2 svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M271.6 921.6v85.1H921v6.4c0 7.9-6.9 14.3-15.4 14.3H274.4c-20.1 0-36.4-15-36.4-33.6v-56.9c0-18.6 16.3-33.6 36.4-33.6h631.2c8.5 0 15.4 6.4 15.4 14.3v4.1H271.6z"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#ffe8c2"
              d="M269 959.5h619v47.1H269z"
              className="colorffebc2 svgShape"
            ></path>
            <path
              fill="#ffeccc"
              d="M349 818h503v74H349z"
              className="colorcce9ff svgShape"
            ></path>
            <path
              fill="#f4a72a"
              d="M349 818v74h522v5.6c0 6.9-5.6 12.4-12.4 12.4H351.2c-16.1 0-29.2-13.1-29.2-29.2v-49.5c0-16.1 13.1-29.2 29.2-29.2h507.4c6.8 0 12.4 5.6 12.4 12.4v3.6H349z"
              className="color2a94f4 svgShape"
            ></path>
            <path
              fill="#4d4d4d"
              d="M566.4 566.1c-6.9-9.1-7.5-21.6-1-31.1 5.2-7.6 8.7-17 8.3-23.9-.8-12.4-8.5-23.8-19-30.6-13.8-9-32.2-10.3-47.1-3.3-14.9 7-25.7 22-27.6 38.3-1.4 11.7 1.3 24.5-4.7 34.7-4.4 7.3-12.5 11.6-20.5 14.5-8.1 2.8-16.6 4.7-24 9-7.4 4.3-13.7 11.7-13.6 20.3.1 6.5 3.8 12.5 4.2 18.9.6 9.4-6 17.7-13 23.9-7.1 6.2-15.2 11.6-20 19.7-7.9 13.4-4.2 31.5 5.8 43.5s25 18.7 40 22.6c41 10.8 84.2 3.8 126.5 3.1 13.1-.2 26.5.2 39.2-3.1 12.7-3.3 25.1-10.9 30.4-22.9 5.4-12 2.7-26.6-4.5-37.5s-18.5-18.8-30.4-24.4c-8.6-4.1-17.8-7.3-24.8-13.7-7-6.4-11.1-17.3-6.4-25.6 1.8-3.2 4.8-5.7 6.5-8.9 3.4-6.2 2-14.1-1.8-20.1-.7-1-1.5-2.1-2.5-3.4z"
              className="color0e538c svgShape"
            ></path>
            <path
              fill="#ffeccc"
              d="M349 851h503v41H349z"
              className="colorcce9ff svgShape"
            ></path>
            <path
              fill="#3d3d3d"
              d="m576 746 62 44 76 157h-14l-85-139s-29 1-39-8-67.5-48-67.5-48l67.5-6z"
              className="color0b4870 svgShape"
            ></path>
            <path
              fill="#4d4d4d"
              d="M466.3 733.4C455 764 463 807 501 809s50 0 50 0l74 150h17l-58-168-70.5-39-47.2-18.6z"
              className="color0e538c svgShape"
            ></path>
            <path
              fill="#fbb94e"
              d="M524 559c10 13 34 49 43 89s34 98 34 98h-29l-28-95-26-89 6-3z"
              className="color4ea3fb svgShape"
            ></path>
            <path
              fill="#ffebca"
              d="M554.8 505.9c1.5 24.5-9.2 41.3-24.5 42.1-15.3.8-25.3-21.4-20.7-42.1 10.7-18.4 25.3-19.9 25.3-19.9h9.2l10.7 19.9z"
              className="colorffe3ca svgShape"
            ></path>
            <path
              fill="#4d4d4d"
              d="M544.6 491.3c-2.8 8.6-9 16-17 20.2-8 4.2-17.6 5.2-26.3 2.6l21.8-31.1h18.7l17.9 14.2-2.7 16.3c-7-5.3-12.4-22.2-12.4-22.2z"
              className="color0e538c svgShape"
            ></path>
            <path
              fill="#ffebca"
              d="M525.7 545.1c-3.2 12.4-2.2 25.4-2.2 27.4-3 4-17 3-19-11 3-18 9-38 9-38l5 11 7.2 10.6z"
              className="colorffe3ca svgShape"
            ></path>
            <path
              fill="#f4a72a"
              d="M506.5 550.9C494 555 452 574 450 578c3 11 18 174 18 174h68s-9-90-4-96 21-27 19-30-27.4-67.5-27.4-67.5l-17.1-7.6z"
              className="color2a94f4 svgShape"
            ></path>
            <path
              fill="#fbb94e"
              d="M450 578c-9.8 7.5-51 75-38 111s55.5 57.2 55.5 57.2v-19.8S433 699 435 679s26-61 26-61l-11-40z"
              className="color4ea3fb svgShape"
            ></path>
            <path
              fill="#ffa005"
              d="M611.1 763.5H463.9c-4.6 0-8.4-3.8-8.4-8.4l-4-94.2c0-4.6 3.8-8.4 8.4-8.4h153.2c4.6 0 8.4 3.8 8.4 8.4l-2 94.2c0 4.6-3.8 8.4-8.4 8.4z"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="#797979"
              d="M639.6 959c9.9 2.2 23.3 13.1 29.7 18.7 1.3 1.1.5 3.3-1.3 3.3-10.3-.2-33.6-1.3-39-5.9-7-6-5-16-5-16h15.6zM713.8 946.6c8.8 2.4 20.4 12.6 26.2 18.1 1.3 1.2.3 3.3-1.4 3.2-9.7-.7-30.5-2.6-35.2-7.1-6.2-5.8-3.9-14.9-3.9-14.9l14.3.7z"
              className="color1a87d8 svgShape"
            ></path>
            <circle
              cx="537"
              cy="708"
              r="15"
              fill="#ffffff"
              className="colorffffff svgShape"
            ></circle>
            <path
              fill="#ffa005"
              d="m405 921-19-11-19 11v-70h38zM699.6 506.5c0 1.9-.7 3.6-1.9 5 1.2 1.3 1.9 3.1 1.9 5v6.2c0 1.3-.4 2.6-1 3.7.6 1.1 1 2.4 1 3.7v6.2c0 4.1-3.3 7.4-7.4 7.4h-64.4c-4.1 0-7.4-3.3-7.4-7.4V530c0-1.3.4-2.6 1-3.7-.6-1.1-1-2.4-1-3.7v-6.2c0-1.9.7-3.6 1.9-5-1.2-1.3-1.9-3.1-1.9-5v-6.2c0-4.1 3.3-7.4 7.4-7.4h64.4c4.1 0 7.4 3.3 7.4 7.4v6.3zM751 366.3c0 36.1-21 67.2-51.4 82v33.6c0 2.5-2.1 4.6-4.6 4.6h-70c-2.5 0-4.6-2.1-4.6-4.6v-33.6c-30.4-14.7-51.4-45.9-51.4-82 0-50.3 40.7-91 91-91s91 40.8 91 91z"
              className="colorffbe55 svgShape"
            ></path>
            <path
              fill="none"
              stroke="#7f7f7f"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="2"
              d="M691 512h-61M691 526h-61"
              opacity=".23"
              className="colorStroke7f7f7f svgStroke"
            ></path>
            <path
              fill="#ffffff"
              d="M675.6 377.5c-1.1-1-2.7-1.5-4.4-1.3-2.1.2-4.1 1.4-5.4 3.1-1.1 1.5-1.7 3.3-2 5-.9-.5-1.9-1-2.8-1.6l-.3-.2h-1.3l-.3.2c-1 .6-1.9 1.1-2.8 1.6-.3-1.7-.9-3.5-2-5-1.2-1.7-3.3-2.9-5.4-3.1-1.7-.2-3.2.3-4.4 1.3-1.5 1.4-2 3.4-1.5 5.5.8 2.8 3.1 5.1 5.8 5.6 1.7.3 3.3.2 5-.2 2.5 32.5 3.5 65.4 2.8 97.9h3c.7-32.6-.3-65.6-2.8-98.1 0-.3 0-.6-.1-.9 1.2-.5 2.3-1.1 3.4-1.8 1.1.6 2.2 1.3 3.4 1.8 0 .3 0 .6-.1.9-2.5 32.5-3.5 65.5-2.8 98.1h3c-.7-32.5.3-65.5 2.8-97.9 1.6.4 3.3.6 5 .2 2.6-.5 5-2.8 5.8-5.6.4-2.1-.1-4.1-1.6-5.5zm-26.3 8.3c-1.5-.3-3-1.8-3.5-3.5-.2-.7-.3-1.8.6-2.5.5-.5 1.2-.6 1.7-.6h.4c1.2.1 2.5.8 3.3 1.9.9 1.2 1.4 2.7 1.6 4.4-1.4.4-2.7.5-4.1.3zm24.9-3.5c-.5 1.7-1.9 3.2-3.5 3.5-1.3.3-2.7.1-4-.3.3-1.7.7-3.2 1.6-4.4.7-1 2-1.7 3.3-1.9.6-.1 1.4 0 2.1.6.7.7.6 1.8.5 2.5z"
              className="colorffffff svgShape"
            ></path>
            <path
              fill="none"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="4"
              d="M636 292c-22 8-58 37-55 84"
              className="colorStrokeffffff svgStroke"
            ></path>
            <circle
              cx="515.5"
              cy="429.5"
              r="25.5"
              fill="#ffa005"
              className="colorffbe55 svgShape"
            ></circle>
            <circle
              cx="788.5"
              cy="345.5"
              r="11.5"
              fill="#ffa005"
              className="colorffbe55 svgShape"
            ></circle>
            <circle
              cx="751"
              cy="526"
              r="19"
              fill="#ffa005"
              className="colorffbe55 svgShape"
            ></circle>
            <circle
              cx="569"
              cy="261"
              r="19"
              fill="#ffa005"
              className="colorffbe55 svgShape"
            ></circle>
            <path
              fill="#000000"
              d="m405 921-19-11-19 11v-70h38z"
              opacity=".14"
              className="color0c0c0c svgShape"
            ></path>
          </svg>
        </div>
      </div>
    </Wrapper>
  )
}

export default NewsletterSection
