import React, { HTMLAttributes } from "react";

interface IIcon extends HTMLAttributes<SVGElement> {
  width?: string;
  height?: string;
  color?: string;
}

const ResumeIcon: React.FC<IIcon> = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="83"
    height="73"
    viewBox="0 0 83 73"
    fill="none"
    // million-ignore
    {...rest}
  >
    <path
      d="M17.406 36.2078L17.255 36.0233C17.8749 35.5178 18.5319 35.0596 19.2204 34.6523L19.3426 34.8609C18.6643 35.2609 18.017 35.7111 17.406 36.2078Z"
      fill="#FF7517"
    />
    <path
      d="M12.483 43.0582L12.2601 42.9743C13.0833 40.7842 14.3636 38.7947 16.0159 37.1382L16.186 37.3084C14.5579 38.9407 13.2956 40.9007 12.483 43.0582Z"
      fill="#FF7517"
    />
    <path
      d="M58.918 53.6206C58.9 51.54 58.3738 49.4953 57.3854 47.6645C56.3969 45.8336 54.976 44.272 53.2464 43.1155C51.5167 41.959 49.5307 41.2427 47.461 41.0288C45.3914 40.815 43.3008 41.11 41.3713 41.8884C39.9679 39.0129 37.7054 36.6448 34.8968 35.1118C32.0882 33.5788 28.8726 32.9569 25.695 33.332C22.5174 33.7072 19.535 35.0609 17.1606 37.2057C14.7863 39.3506 13.1374 42.1805 12.4423 45.3038C8.99741 45.5211 5.77254 47.0713 3.45121 49.6258C1.12988 52.1804 -0.10545 55.5385 0.0070633 58.9884C0.119576 62.4383 1.57109 65.7087 4.05394 68.1066C6.53679 70.5045 9.85581 71.8413 13.3075 71.8336H55.5673C57.7705 71.8365 59.9048 71.0667 61.5989 69.6581C63.2929 68.2495 64.4393 66.2914 64.8384 64.1247C65.2375 61.958 64.8641 59.7199 63.7832 57.8002C62.7023 55.8804 60.9823 54.4005 58.9228 53.6182L58.918 53.6206Z"
      fill="#FF7517"
    />
    <path
      d="M49.4124 49.3304H15.5941C15.3188 49.3292 15.0552 49.2191 14.8608 49.0242C14.6664 48.8294 14.5569 48.5655 14.5563 48.2902C14.5569 48.0152 14.6664 47.7516 14.8609 47.5571C15.0554 47.3626 15.319 47.2531 15.5941 47.2524H49.4124C49.6875 47.2531 49.9511 47.3626 50.1456 47.5571C50.3401 47.7516 50.4496 48.0152 50.4502 48.2902C50.4496 48.5655 50.3402 48.8294 50.1457 49.0242C49.9513 49.2191 49.6877 49.3292 49.4124 49.3304Z"
      fill="#263238"
    />
    <path
      d="M44.3121 63.3754H20.6943C19.7688 63.3754 18.8812 63.0077 18.2268 62.3533C17.5723 61.6988 17.2047 60.8112 17.2047 59.8857C17.2047 58.9602 17.5723 58.0725 18.2268 57.4181C18.8812 56.7637 19.7688 56.396 20.6943 56.396H44.3121C45.2376 56.396 46.1252 56.7637 46.7797 57.4181C47.4341 58.0725 47.8018 58.9602 47.8018 59.8857C47.8018 60.8112 47.4341 61.6988 46.7797 62.3533C46.1252 63.0077 45.2376 63.3754 44.3121 63.3754ZM20.6943 56.6357C19.8324 56.6357 19.0057 56.9781 18.3962 57.5876C17.7867 58.1971 17.4443 59.0237 17.4443 59.8857C17.4443 60.7476 17.7867 61.5743 18.3962 62.1838C19.0057 62.7933 19.8324 63.1357 20.6943 63.1357H44.3121C45.174 63.1357 46.0007 62.7933 46.6102 62.1838C47.2197 61.5743 47.5621 60.7476 47.5621 59.8857C47.5621 59.0237 47.2197 58.1971 46.6102 57.5876C46.0007 56.9781 45.174 56.6357 44.3121 56.6357H20.6943Z"
      fill="white"
    />
    <path
      d="M26.2117 62.536H20.6991C19.9948 62.5366 19.3189 62.2579 18.8198 61.761C18.3206 61.2641 18.0389 60.5895 18.0363 59.8852C18.0382 59.1825 18.318 58.5091 18.8147 58.012C19.3113 57.5149 19.9845 57.2345 20.6871 57.2319H26.1997C26.9024 57.2345 27.5755 57.5149 28.0722 58.012C28.5688 58.5091 28.8486 59.1825 28.8505 59.8852C28.848 60.5854 28.5696 61.2563 28.0756 61.7526C27.5816 62.2488 26.9119 62.5303 26.2117 62.536Z"
      fill="white"
    />
    <path
      d="M50.3783 29.1828L45.8939 48.2899H19.1412L26.6239 16.4009L45.1486 20.7462L50.3783 29.1828Z"
      fill="#FF7517"
    />
    <path
      opacity="0.8"
      d="M50.3783 29.1828L45.8939 48.2899H19.1412L26.6239 16.4009L45.1486 20.7462L50.3783 29.1828Z"
      fill="#FAFAFA"
    />
    <path
      d="M46.8886 32.7349L26.5688 27.9653C26.4994 27.9492 26.4338 27.9196 26.3758 27.8781C26.3178 27.8366 26.2686 27.784 26.2309 27.7235C26.1933 27.6629 26.168 27.5955 26.1565 27.5251C26.1449 27.4547 26.1474 27.3828 26.1638 27.3134C26.1963 27.173 26.2832 27.0512 26.4055 26.9748C26.5277 26.8984 26.6752 26.8736 26.8157 26.9059L47.1379 31.6683C47.2781 31.7019 47.3993 31.7895 47.4751 31.9121C47.551 32.0346 47.5754 32.1822 47.5429 32.3226C47.5104 32.4638 47.4233 32.5863 47.3007 32.6635C47.1782 32.7408 47.03 32.7664 46.8886 32.7349Z"
      fill="#FF7517"
    />
    <path
      d="M46.1121 36.0427L25.7923 31.2731C25.7227 31.2567 25.657 31.2268 25.599 31.1851C25.541 31.1434 25.4918 31.0906 25.4542 31.0298C25.4166 30.9691 25.3913 30.9015 25.3798 30.831C25.3683 30.7604 25.3708 30.6883 25.3872 30.6188C25.4208 30.4786 25.5084 30.3574 25.631 30.2815C25.7535 30.2057 25.9011 30.1813 26.0415 30.2137L46.3613 34.9833C46.5013 35.0163 46.6225 35.1035 46.6984 35.2256C46.7743 35.3478 46.7987 35.4951 46.7664 35.6352C46.7333 35.7758 46.6459 35.8976 46.5233 35.9739C46.4007 36.0503 46.2528 36.075 46.1121 36.0427Z"
      fill="#FF7517"
    />
    <path
      d="M45.3355 39.3381L25.0157 34.571C24.8756 34.5374 24.7544 34.4497 24.6785 34.3272C24.6026 34.2046 24.5783 34.0571 24.6107 33.9166C24.6448 33.7768 24.7326 33.656 24.855 33.5802C24.9774 33.5045 25.1246 33.4798 25.265 33.5116L45.5848 38.2788C45.6544 38.2951 45.72 38.325 45.778 38.3667C45.836 38.4085 45.8852 38.4612 45.9229 38.522C45.9605 38.5828 45.9858 38.6503 45.9972 38.7209C46.0087 38.7914 46.0062 38.8635 45.9898 38.9331C45.9735 39.0026 45.9436 39.0683 45.9019 39.1263C45.8601 39.1843 45.8074 39.2335 45.7466 39.2711C45.6858 39.3088 45.6183 39.334 45.5477 39.3455C45.4772 39.357 45.4051 39.3545 45.3355 39.3381Z"
      fill="#FF7517"
    />
    <path
      d="M44.5613 42.6552L24.2391 37.9C24.0993 37.8659 23.9785 37.7781 23.9027 37.6558C23.827 37.5334 23.8023 37.3861 23.8341 37.2457C23.8677 37.1056 23.9553 36.9844 24.0779 36.9085C24.2004 36.8326 24.348 36.8082 24.4884 36.8407L44.8082 41.6078C44.9485 41.6415 45.0699 41.729 45.1461 41.8514C45.2224 41.9739 45.2473 42.1214 45.2156 42.2621C45.18 42.4004 45.0914 42.5191 44.969 42.5927C44.8466 42.6662 44.7002 42.6887 44.5613 42.6552Z"
      fill="#FF7517"
    />
    <path
      d="M35.7053 44.0671L23.465 41.191C23.3263 41.1559 23.207 41.0675 23.1329 40.945C23.0589 40.8225 23.0361 40.6758 23.0695 40.5367C23.0856 40.4672 23.1152 40.4016 23.1567 40.3436C23.1982 40.2856 23.2508 40.2364 23.3114 40.1988C23.3719 40.1611 23.4393 40.1358 23.5097 40.1243C23.5801 40.1128 23.652 40.1153 23.7214 40.1316L35.9641 43.0077C36.0337 43.0241 36.0993 43.054 36.1574 43.0957C36.2154 43.1375 36.2646 43.1902 36.3022 43.251C36.3398 43.3118 36.3651 43.3793 36.3766 43.4499C36.3881 43.5204 36.3856 43.5925 36.3692 43.6621C36.3529 43.7326 36.3227 43.7993 36.2803 43.858C36.2379 43.9168 36.1842 43.9665 36.1224 44.0042C36.0606 44.0419 35.9918 44.0669 35.9202 44.0777C35.8485 44.0885 35.7755 44.0849 35.7053 44.0671Z"
      fill="#FF7517"
    />
    <path
      d="M50.3784 29.1827L43.5452 27.5793L45.1486 20.7461L50.3784 29.1827Z"
      fill="#FF7517"
    />
    <path
      d="M66.8585 10.9556C67.3379 11.3247 67.7597 11.6938 68.1959 12.0773C68.6321 12.4607 69.0491 12.8538 69.4614 13.2589C70.2979 14.0788 71.0794 14.9532 71.8006 15.8761L72.0691 16.238L72.2033 16.4178C72.2792 16.5238 72.3472 16.6351 72.407 16.7509C72.5999 17.1382 72.7124 17.5606 72.7378 17.9925C72.7726 18.6582 72.7038 19.3252 72.534 19.9698C72.2411 21.1267 71.7946 22.2391 71.2062 23.2773L69.9815 22.7788C70.2264 21.7445 70.4002 20.6947 70.5016 19.6367C70.5471 19.1805 70.5326 18.7204 70.4584 18.2681C70.4369 18.139 70.3888 18.0157 70.317 17.9062C70.3051 17.8942 70.3003 17.8942 70.2931 17.887L70.1636 17.7408L69.9048 17.446C69.1858 16.6695 68.4284 15.9121 67.6279 15.1835C66.8273 14.4548 65.9981 13.7214 65.1927 13.0408L66.8585 10.9556Z"
      fill="#7F3E3B"
    />
    <path
      d="M70.468 22.2852L69.0899 23.2439L70.7676 24.2601C70.7676 24.2601 71.6329 23.4332 71.2614 22.6662L70.468 22.2852Z"
      fill="#7F3E3B"
    />
    <path
      d="M68.4044 24.8181L69.6747 25.53L70.7772 24.2477L69.0899 23.2339L68.4044 24.8181Z"
      fill="#7F3E3B"
    />
    <path
      d="M57.4752 5.94642C57.5136 6.10221 57.4632 6.24841 57.3626 6.27478C57.2619 6.30114 57.1469 6.19568 57.1061 6.0351C57.0654 5.87452 57.1181 5.73311 57.2188 5.70674C57.3194 5.68038 57.4345 5.78344 57.4752 5.94642Z"
      fill="#263238"
    />
    <path
      d="M57.4776 6.24609C57.4145 6.76702 57.2798 7.27674 57.0773 7.76085C57.2027 7.80921 57.3371 7.82975 57.4711 7.82106C57.6052 7.81237 57.7358 7.77465 57.8539 7.71052L57.4776 6.24609Z"
      fill="#630F0F"
    />
    <path
      d="M57.8035 4.94713C57.7848 4.95317 57.7647 4.95317 57.746 4.94713C57.6373 4.90096 57.5192 4.88103 57.4014 4.88894C57.2836 4.89685 57.1693 4.93239 57.0677 4.99266C57.0477 5.00357 57.0243 5.00677 57.0021 5.00165C56.9798 4.99654 56.9602 4.98346 56.947 4.96489C56.9337 4.94632 56.9277 4.92353 56.9301 4.90084C56.9324 4.87814 56.943 4.85709 56.9599 4.84167C57.0864 4.76219 57.2302 4.71437 57.3792 4.70227C57.5281 4.69017 57.6778 4.71415 57.8155 4.77216C57.8338 4.77952 57.8493 4.79248 57.8598 4.80919C57.8703 4.8259 57.8752 4.84551 57.8739 4.86519C57.8726 4.88488 57.865 4.90364 57.8524 4.91879C57.8398 4.93393 57.8227 4.94469 57.8035 4.94952V4.94713Z"
      fill="#263238"
    />
    <path
      d="M62.3885 6.38281C62.6114 7.84484 62.9253 10.0858 64.21 10.6515C64.21 10.6515 64.3346 12.171 61.7965 13.0842C59.0066 14.0884 59.9653 12.1806 59.9653 12.1806C61.3579 11.2674 60.9121 10.1529 60.2649 9.18703L62.3885 6.38281Z"
      fill="#7F3E3B"
    />
    <path
      d="M64.4498 10.3371C64.4498 9.87933 63.9824 9.086 63.5103 9.13873C62.9902 9.19865 61.0056 9.92966 60.2818 10.5984C59.558 11.2671 60.0709 12.4391 60.0709 12.4391L64.4498 10.3371Z"
      fill="#263238"
    />
    <path
      d="M79.7531 65.7507C79.6285 65.8801 79.4871 65.9904 79.3768 65.9736C79.3289 65.9736 79.2666 65.94 79.2354 65.8346C79.2271 65.8079 79.2247 65.7796 79.2284 65.7519C79.2321 65.7241 79.2419 65.6976 79.257 65.674C79.3912 65.4463 79.976 65.3289 79.9928 65.3241C80.0008 65.3225 80.0092 65.3232 80.0168 65.3262C80.0244 65.3291 80.0311 65.3342 80.0359 65.3408C80.0399 65.3478 80.042 65.3556 80.042 65.3636C80.042 65.3716 80.0399 65.3795 80.0359 65.3864C79.9544 65.5172 79.8596 65.6393 79.7531 65.7507ZM79.36 65.6764C79.3469 65.6882 79.3356 65.702 79.3265 65.7171C79.3181 65.731 79.3128 65.7465 79.3107 65.7626C79.3086 65.7787 79.3099 65.795 79.3145 65.8106C79.3385 65.8849 79.3744 65.8897 79.3864 65.8921C79.5086 65.9065 79.7603 65.6524 79.9113 65.4295C79.7112 65.4691 79.5228 65.5535 79.36 65.6764Z"
      fill="#FF7517"
    />
    <path
      d="M80.0311 65.3932C80.0266 65.3985 80.0208 65.4026 80.0143 65.4052C79.8154 65.4675 79.2953 65.4508 79.1779 65.2878C79.161 65.2619 79.1532 65.231 79.1558 65.2002C79.1584 65.1694 79.1712 65.1403 79.1922 65.1176C79.2113 65.0917 79.2357 65.0701 79.2638 65.0544C79.292 65.0387 79.3231 65.0292 79.3552 65.0265C79.6165 64.9954 80.0119 65.3189 80.0287 65.3333C80.0343 65.3379 80.0385 65.3438 80.0411 65.3506C80.0436 65.3573 80.0443 65.3646 80.0431 65.3717C80.0411 65.3798 80.037 65.3873 80.0311 65.3932ZM79.2713 65.1536C79.2713 65.1536 79.2713 65.1536 79.2593 65.1679C79.2258 65.2111 79.2402 65.2303 79.2474 65.2398C79.3145 65.3357 79.6812 65.3789 79.9065 65.3429C79.7545 65.2097 79.5655 65.1261 79.3648 65.1032C79.3466 65.1047 79.3289 65.1099 79.3128 65.1186C79.2967 65.1272 79.2826 65.1391 79.2713 65.1536Z"
      fill="#FF7517"
    />
    <path
      d="M65.2527 70.7598C65.0274 70.7598 64.8093 70.7286 64.735 70.628C64.7165 70.6012 64.7067 70.5694 64.7067 70.5369C64.7067 70.5044 64.7165 70.4726 64.735 70.4458C64.7492 70.4214 64.7681 70.4 64.7908 70.3832C64.8135 70.3663 64.8393 70.3541 64.8668 70.3476C65.1592 70.2685 65.7752 70.6184 65.8016 70.6352C65.8086 70.6391 65.8143 70.6451 65.8178 70.6524C65.8212 70.6597 65.8222 70.668 65.8207 70.6759C65.8198 70.6847 65.816 70.693 65.81 70.6995C65.8039 70.706 65.7959 70.7103 65.7872 70.7119C65.6107 70.743 65.4319 70.759 65.2527 70.7598ZM64.9747 70.4195C64.9476 70.4155 64.9202 70.4155 64.8932 70.4195C64.8763 70.4228 64.8603 70.4296 64.8463 70.4395C64.8323 70.4494 64.8205 70.4622 64.8117 70.477C64.7829 70.5297 64.7925 70.5537 64.8117 70.5705C64.8932 70.6831 65.3366 70.6855 65.6649 70.64C65.452 70.5229 65.2184 70.448 64.9771 70.4195H64.9747Z"
      fill="#FF7517"
    />
    <path
      d="M65.7871 70.7117C65.7817 70.7137 65.7758 70.7137 65.7703 70.7117C65.557 70.6182 65.1376 70.2323 65.1688 70.0382C65.1688 69.9903 65.2095 69.9327 65.3245 69.9208C65.3673 69.9155 65.4107 69.9192 65.4519 69.9316C65.4932 69.944 65.5314 69.9648 65.5642 69.9927C65.7255 70.1837 65.8212 70.4215 65.8375 70.671C65.8384 70.6783 65.8373 70.6857 65.8344 70.6924C65.8314 70.6992 65.8267 70.705 65.8207 70.7093C65.8156 70.7121 65.81 70.7137 65.8042 70.7141C65.7984 70.7145 65.7926 70.7137 65.7871 70.7117ZM65.3581 69.9927H65.3317C65.2574 69.9927 65.2526 70.0286 65.2502 70.0382C65.2311 70.158 65.5187 70.4576 65.7296 70.5871C65.7089 70.3857 65.625 70.1961 65.4899 70.0454C65.4524 70.0155 65.4061 69.9987 65.3581 69.9975V69.9927Z"
      fill="#FF7517"
    />
    <path
      d="M67.7238 70.6706H65.9621L65.7872 66.5913H67.5488L67.7238 70.6706Z"
      fill="#7F3E3B"
    />
    <path
      d="M81.8335 64.6986L80.2037 65.2906L78.1329 61.6379L79.7627 61.0459L81.8335 64.6986Z"
      fill="#7F3E3B"
    />
    <path
      d="M79.9472 65.1294L81.323 63.7058C81.3474 63.6813 81.3793 63.6657 81.4135 63.6614C81.4478 63.6571 81.4826 63.6642 81.5123 63.6818L82.8785 64.5207C82.9115 64.5413 82.9394 64.5692 82.9602 64.6021C82.9809 64.6351 82.994 64.6723 82.9984 64.711C83.0028 64.7497 82.9983 64.7889 82.9855 64.8257C82.9726 64.8624 82.9516 64.8958 82.924 64.9233C82.4447 65.4027 82.1738 65.6256 81.5698 66.2511C81.1959 66.6346 80.0886 67.9289 79.5757 68.4705C79.0628 69.0122 78.4684 68.5616 78.6314 68.298C79.3624 67.1164 79.8034 65.9923 79.8298 65.4099C79.8329 65.3051 79.8748 65.2052 79.9472 65.1294Z"
      fill="#263238"
    />
    <path
      d="M65.9717 70.4673H67.8891C67.9242 70.467 67.9583 70.4787 67.9858 70.5005C68.0132 70.5223 68.0324 70.5529 68.0401 70.5871L68.3876 72.1522C68.3964 72.19 68.3964 72.2293 68.3877 72.2672C68.3789 72.305 68.3616 72.3403 68.3371 72.3704C68.3126 72.4005 68.2815 72.4245 68.2462 72.4407C68.2109 72.4569 68.1724 72.4648 68.1336 72.4638C67.4409 72.4638 66.439 72.4135 65.5666 72.4135C64.548 72.4135 64.1022 72.4686 62.9062 72.4686C62.1872 72.4686 61.9835 71.7376 62.2855 71.6705C63.6636 71.3685 64.3515 71.3373 65.5427 70.6039C65.6702 70.5194 65.8188 70.4721 65.9717 70.4673Z"
      fill="#263238"
    />
    <path
      d="M61.1901 14.4524C60.9193 15.1355 60.6317 15.7707 60.3345 16.4226C60.0373 17.0745 59.7209 17.7073 59.395 18.34C58.7343 19.6419 57.9772 20.8925 57.13 22.0814C56.9071 22.3833 56.6674 22.6829 56.411 22.9801C56.2792 23.1311 56.1449 23.2701 55.9867 23.4259C55.8036 23.5988 55.6037 23.753 55.39 23.8861C55.0378 24.1015 54.6673 24.2852 54.2827 24.435C53.9231 24.5812 53.5636 24.701 53.2113 24.8065C51.8226 25.2093 50.3977 25.4742 48.957 25.5974L48.6886 24.3032C49.9709 23.8406 51.2747 23.3588 52.4755 22.822C52.7727 22.6829 53.0651 22.5415 53.3383 22.3953C53.591 22.2641 53.8316 22.1109 54.0574 21.9375C54.1352 21.8789 54.2067 21.8122 54.2707 21.7386C54.3545 21.6403 54.4552 21.5253 54.5463 21.4079C54.7308 21.1682 54.913 20.9141 55.088 20.6433C55.4451 20.1112 55.7758 19.5336 56.0946 18.9464C56.4134 18.3592 56.725 17.748 57.0222 17.1488C57.6189 15.9336 58.1966 14.6753 58.7287 13.4458L61.1901 14.4524Z"
      fill="#7F3E3B"
    />
    <path
      d="M65.2095 9.90347C67.7357 9.70693 70.003 13.4531 70.003 13.4531L68.1887 16.4011C66.8833 15.8851 65.6694 15.1624 64.5935 14.2608C62.8751 12.7676 63.4838 10.0401 65.2095 9.90347Z"
      fill="#FF7517"
    />
    <path
      opacity="0.3"
      d="M65.0514 13.0596L67.7094 16.6379L67.5896 16.7841C67.5896 16.7841 66.674 16.0651 65.6146 15.0249L65.0514 13.0596Z"
      fill="black"
    />
    <path
      d="M58.2037 12.6953C58.0623 13.9297 60.1211 19.3895 60.6005 25.8656L69.9742 24.9428C69.9071 23.7013 69.2217 18.4715 67.9801 12.5683C67.6374 10.9385 66.3743 9.69219 64.7421 10.011H64.6966C63.3857 10.2669 62.0908 10.599 60.8186 11.0056C60.0989 11.2677 59.3974 11.5776 58.719 11.9332C58.5771 12.008 58.4558 12.1167 58.3659 12.2497C58.276 12.3826 58.2203 12.5357 58.2037 12.6953Z"
      fill="#FF7517"
    />
    <path
      opacity="0.3"
      d="M59.1528 17.2306C59.311 17.8897 59.4764 18.604 59.6322 19.3638C61.0583 19.0258 60.7826 15.8645 60.8114 15.8237L59.1528 17.2306Z"
      fill="black"
    />
    <path
      d="M61.2572 13.3065C61.9763 15.7728 59.3159 19.0587 59.3159 19.0587L56.6363 17.3331C56.6363 17.3331 56.6171 15.0729 57.4727 13.3089C58.5585 11.0751 60.7443 11.5473 61.2572 13.3065Z"
      fill="#FF7517"
    />
    <path
      d="M48.7149 24.0686L47.6388 23.9224L47.6556 26.1705C47.6556 26.1705 49.1056 26.3191 49.9109 25.3197L49.7527 24.8978C49.6706 24.6789 49.5308 24.4862 49.3481 24.3402C49.1654 24.1942 48.9466 24.1004 48.7149 24.0686Z"
      fill="#7F3E3B"
    />
    <path
      d="M45.8005 24.4425L46.4884 26.2736L47.6652 26.1705L47.6484 23.9224L45.8005 24.4425Z"
      fill="#7F3E3B"
    />
    <path
      opacity="0.2"
      d="M65.7872 66.5947L65.8854 68.886H67.6471L67.5488 66.5947H65.7872Z"
      fill="black"
    />
    <path
      opacity="0.2"
      d="M79.7627 61.0459L78.1329 61.6379L79.2785 63.6608L80.8316 62.9274L79.7627 61.0459Z"
      fill="black"
    />
    <path
      d="M62.5587 4.29266C62.9302 6.22685 63.2465 7.33895 62.5347 8.5637C61.4657 10.4044 58.8916 10.1336 57.9521 8.35039C57.1036 6.74216 56.6387 3.85166 58.302 2.61732C58.6686 2.34152 59.0999 2.16429 59.5545 2.10255C60.0091 2.0408 60.4719 2.09661 60.8988 2.26463C61.3258 2.43266 61.7025 2.70729 61.9931 3.06233C62.2836 3.41737 62.4784 3.84096 62.5587 4.29266Z"
      fill="#7F3E3B"
    />
    <path
      d="M59.3015 5.58397C58.1223 6.17357 58.1031 4.28971 58.1966 3.88945C57.7532 4.31608 57.154 4.7451 56.0659 4.27533C54.7285 3.69771 55.1071 2.18775 56.0659 2.20692C56.0659 2.20692 55.3468 0.840765 56.9191 0.696959C57.5661 0.675421 58.2114 0.774581 58.8221 0.989365C58.8221 0.989365 59.4045 -0.537375 60.8234 0.203226C61.5736 0.593899 62.1728 1.74914 62.1728 1.74914C62.1728 1.74914 65.2287 2.20213 63.5701 3.79838C63.9464 4.61807 63.7475 7.28567 62.7768 8.42653C62.3526 8.92506 58.7215 8.77886 59.3015 5.58397Z"
      fill="#263238"
    />
    <path
      d="M61.6431 2.52859C61.6431 2.52859 62.1968 1.76402 62.2423 0C63.5342 1.40451 61.6431 2.52859 61.6431 2.52859Z"
      fill="#263238"
    />
    <path
      d="M59.8743 5.47639C59.9055 5.96522 59.774 6.45061 59.5004 6.85693C59.1409 7.3914 58.652 7.16131 58.4938 6.59807C58.35 6.09236 58.3644 5.20316 58.8509 4.86761C59.3375 4.53206 59.824 4.88678 59.8743 5.47639Z"
      fill="#7F3E3B"
    />
    <path
      d="M63.9296 25.5396C63.9296 25.5396 67.2372 38.7218 68.8238 43.6424C70.5591 49.0207 78.0897 63.1209 78.0897 63.1209L81.0449 61.8338C81.0449 61.8338 75.3454 48.9967 74.1279 43.6184C72.8072 37.7895 69.9791 24.938 69.9791 24.938L63.9296 25.5396Z"
      fill="#263238"
    />
    <path
      d="M77.2149 62.1482C77.2029 62.1482 78.1736 63.536 78.1736 63.536L81.4931 62.0692L80.822 60.6958L77.2149 62.1482Z"
      fill="#FF7517"
    />
    <path
      opacity="0.3"
      d="M65.6577 30.1873C68.0018 30.4102 68.601 39.0098 68.7592 43.4486C67.7885 40.3951 66.2282 34.4919 65.1448 30.2999C65.2982 30.2056 65.479 30.1659 65.6577 30.1873Z"
      fill="black"
    />
    <path
      d="M60.6053 25.8661C60.6053 25.8661 60.9864 39.4126 61.7031 44.7382C62.4485 50.2771 65.2047 67.9868 65.2047 67.9868H68.1887C68.1887 67.9868 67.4984 50.1022 67.0934 44.6303C66.6524 38.6648 66.7674 25.2549 66.7674 25.2549L60.6053 25.8661Z"
      fill="#263238"
    />
    <path
      d="M64.6103 66.5947C64.5984 66.5947 64.85 68.3995 64.85 68.3995L68.4763 68.2749L68.5099 66.5971L64.6103 66.5947Z"
      fill="#FF7517"
    />
  </svg>
);

export default ResumeIcon;
