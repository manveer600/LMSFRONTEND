import HomeLayout from "../Layouts/HomeLayout";
import { celebrities } from "../Constants/CelebrityData";
import { Typewriter, Cursor, useTypewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import CarouselSlide from '../Components/CarouselSlide.jsx'
function AboutUs() {
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className=" w-full pt-20 flex flex-col items-center justify-center text-white ">
        {/* pehla div */}
        <div className="flex flex-col sm:p-3 sm:flex-row items-center justify-center text-center sm:text-start">
          <section className="sm:w-1/2 flex m-4 flex-col font-serif space-y-3">
            <h1 className="sm:text-4xl md:text-5xl text-3xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl  text-white">
              Upscaling made &lt;{" "}
              <span className="text-green-500">
                <Typewriter
                  words={["Easy", "Affordable", "Practical"]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </span>
              &gt;
              <br />
              with <span className="underline text-red-500">Code Karo</span>
            </p>
            <p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-yellow-500 mb-3 px-5 py-3 rounded-md  text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 font-normal"
              >
                Explore Courses
              </button>
            </p>
          </section>

          <div className="sm:w-1/2 flex flex-col justify-center items-center">
            <img
              className="drop-shadow-2xl"
              id="test1"
              src="https://github.com/singhsanket143/lms-frontend-hn/blob/master/src/Assets/Images/aboutMainImage.png?raw=true"
              alt="about main image"
            />
          </div>
        </div>

        {/* 2nd div */}
        <div className="text-green-400 font-serif m-3 ">
          <ul className=" flex flex-wrap items-center justify-center gap-[120px] p-10 ">
            <li>
              <div className="shadow-[0_0_10px_black] flex items-center justify-center space-x-3 py-3 px-6 ">
                <img
                  src="https://c8.alamy.com/comp/GJ70N4/creative-salary-increment-growth-graphics-design-GJ70N4.jpg"
                  className="h-12"
                  alt=""
                />
                <div>
                  <h1>55%</h1>
                  <h1>Average Salary Hike</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="shadow-[0_0_10px_black] flex items-center justify-center py-3 px-6 space-x-3 ">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2023/9/342352833/PF/UU/AF/189726233/sm202401red.jpg"
                  className="h-10"
                  alt=""
                />
                <div>
                  <h1>600+</h1>
                  <h1>Different Courses</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="shadow-[0_0_10px_black] flex items-center justify-center py-3 px-6 space-x-3 ">
                <img
                  src="https://store.asisonline.org/media/catalog/product/cache/ed852630db4d98d2b658b6b00a4fae3e/u/p/upcoming-careerhq_1.png"
                  className="h-10"
                  alt=""
                />
                <div>
                  <h1>12000+</h1>
                  <h1>Career Transitions</h1>
                </div>
              </div>
            </li>
            <li>
              <div className="shadow-[0_0_10px_black] flex justify-center items-center space-x-3 py-3 px-6 ">
                <img
                  src="https://miro.medium.com/v2/resize:fit:720/1*eTb4COzvrIpceQwCqzMqYQ.jpeg"
                  className="h-10"
                  alt=""
                />
                <div>
                  <h1>400+</h1>
                  <h1>Hiring Partners</h1>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="m-5  space-y-4 mb-20">
          <h1 className=" font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-4xl font-serif text-blue-500 underline p-5">
            Our Achievers work with
          </h1>
          <div className="flex flex-row  p-10  overflow-x-scroll no-scrollbar ">
            <img
              className="ml-[80px] w-[600px] h-20 shadow-[0_0_50px_black]"
              src="https://www.shutterstock.com/image-photo/hcl-sign-near-company-office-260nw-1437722072.jpg"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_50px_black]"
              src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202304/unacademy-sixteen_nine.png?size=948:533"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://m.media-amazon.com/images/G/31/social_share/amazon_logo._CB633266945_.png"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://www.cnet.com/a/img/resize/f92ae43457ac52e0b761737181264a82aa0765bb/hub/2019/02/04/8311b046-6f2b-4b98-8036-e765f572efad/msft-microsoft-logo-2-3.jpg?auto=webp&fit=crop&height=675&width=1200"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://images.indianexpress.com/2021/05/Google_Reuters_F.jpg"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://data.bloomberglp.com/company/sites/51/2019/08/og-image-generic-lp.png"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://www.cnet.com/a/img/resize/f92ae43457ac52e0b761737181264a82aa0765bb/hub/2019/02/04/8311b046-6f2b-4b98-8036-e765f572efad/msft-microsoft-logo-2-3.jpg?auto=webp&fit=crop&height=675&width=1200"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://www.thoughtco.com/thmb/xA0zo7FUyCKKiuR39yl56V2y5so=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/intel-logo-56a6fa195f9b58b7d0e5ce3a.png"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://www.investors.com/wp-content/uploads/2022/01/Stock-junipernetworks-01-adobe.jpg"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202210/qualcomm-hq-5-web-sixteen_nine.jpg?size=1200:675"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Logo_of_the_TCL_Corporation.svg/1200px-Logo_of_the_TCL_Corporation.svg.png"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://media.licdn.com/dms/image/D560BAQEDRyEza4L5bw/company-logo_200_200/0/1688145028589/druva_logo?e=2147483647&v=beta&t=YGJvbiswZWd_iqftZxTpsTWZD2l9qPbJvy3hsM8BbtQ"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JqNjFbNrj6FmVK3v2A_axDf8vVs1a5JKu93p4AVUnuLtEu1AIcGFzmnlQQR6lbngKg&usqp=CAU"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://1000logos.net/wp-content/uploads/2020/09/Schlumberger-Logo.jpg"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://friends.co.id/images/friends-logo-share.jpg"
              alt=""
            />
            <img
              className="ml-[80px] w-[400px] h-20 rounded-lg shadow-[0_0_10px_black]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxCJJzYs0mLG3KUQy1h8WhQL6zFh2lD72guKmSMuu1nl4hqiywwo-3r16gVqK9E6lVZA&usqp=CAU"
              alt=""
            />
          </div>
        </div>



        {/* success stories */}
        <div className="m-5 mb-20">
          <h1 className=" font-bold text-center font-serif text-transparent text-4xl  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  text-blue-500 p-5">
            Success Stories
          </h1>

          <div className="flex first-letter:h-[500px] space-x-[100px] p-10 w-[90vw] overflow-x-scroll no-scrollbar ">
            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                60% increment
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Manveer Singh
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  Software engineer at google
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                7-12LPA(FRESHER)
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Hunar Arora
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  Software engineer at microsoft
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px]  w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                60% increment
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Himanshu Bhopal
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  Web Developer at codsoft
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                24LPA
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Raj Shyam
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">SWE at linkedin</p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                250% increment
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Raj Bhosu Singh
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  AI engineer at Uber
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                1L/PM
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Mehreen Kaur
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  2024 Intern at google
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                60% increment
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Hunny kaur
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  ML engineer at Ola
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>

            <div className="h-[450px] w-[250px] sm:w-[400px] shadow-[0_0_10px_black] ">
              <h1 className="flex justify-center text-yellow-400 items-center h-10 shadow-[0_0_10px_black] bg-gray-500 rounded-tl-lg  font-bold text-2xl">
                22LPA
              </h1>
              <div className="p-4 w-[275px] sm:w-[400px]">
                <div className="flex gap-4 items-center">
                  <img
                    src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg"
                    className="h-10"
                    alt=""
                  />
                  <h1 className="text-xl text-green-400 font-bold font-serif">
                    Navinder Singh
                  </h1>
                </div>
                <p className="font-serif ml-14 text-red-400">
                  Software engineer at Facebook
                </p>
                <br />
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet commodi dolor atque, aspernatur hic quaerat quidem
                  debitis necessitatibus asperiores ea aut, numquam quia
                  repellat fuga amet doloribus expedita odit. Obcaecati?
                </p>
                <section className="mt-3">
                  From good company to bad company
                </section>
              </div>
            </div>
          </div>
        </div>



        {/* carousel wala div */}
        <h1 class="font-bold font-serif text-center text-transparent text-4xl animate-bounce  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-3">
          Some of the famous quotes from where we get inspire
        </h1>
        <div className="carousel w-full font-serif mt-3 ">
          {celebrities.map((celebrity) => (
            <CarouselSlide
              {...celebrity}
              key={celebrity.slideNumber}
              totalSlides={celebrities.length}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
