import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import FirstPicture from '@/components/mudanlow/frontpage/first-pic'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import NavbarLogin from '@/components/layout/mudanlow-layout/navbar-login'
import Footer from '@/components/layout/mudanlow-layout/footer'
import FrontPageCarousel from '@/components/mudanlow/frontpage/carousel'
import MessageBoard from '@/components/mudanlow/frontpage/messageboard'
import Link from 'next/link'
import News from '@/components/mudanlow/frontpage/news'
import { useAuth } from '@/hooks/use-auth'
import MudanlowLayout from '@/components/layout/mudanlow-layout'

export default function MudanlowIndex() {
  const { auth } = useAuth()

  return (
    <>
      <FirstPicture />
      {/* <MudanlowLayout hideNavbarOnHome> */}
      {auth.isAuth ? <NavbarLogin /> : <Navbar />}
      <section id="about-us" className="background2">
        <div className="container-fluid p-5">
          <div className="row align-items-center justify-content-center g-5">
            <div className="col-lg-5">
              <div className="image-holder mb-4">
                <Image
                  src="images/mudanlow-小圖檔/DSC00576.jpg"
                  alt="single"
                  className="Image-fluid"
                  width={800}
                  height={600}
                  priority
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="detail p-5">
                <div className="display-header">
                  <h2 className="display-4 text-dark pb-2 lxgw-wenkai-mono-tc-bold">
                    起源/宗旨
                  </h2>
                  <p className="pb-3 lxgw-wenkai-mono-tc-regular">
                    2016年春天，一家名為「牡丹樓中式料理」的小店開始了它的故事。
                    在店主邱小姐心中，家始終是最溫暖的地方，而食物是家的象徵。於是，他決定開設一家以家為靈感的中國傳統料理餐廳，希望能將家的溫馨帶給每一位客人。
                    <br />
                    從開店至今，我們相信，每一位客人都是家人，應該被以真誠和溫暖來對待。無論是簡單的問候還是精心的服務，他都希望能讓顧客在牡丹樓感受到家的溫馨，便將「顧客至上」作為店家的宗旨。
                    <br />
                    每一道餐點都蘊含著我們對家的深情，每一位客人都被真誠和溫暖所包圍。
                    牡丹樓的故事將繼續延續下去，帶給更多人家的溫馨與美味。
                  </p>
                  <a
                    href="about-us.html"
                    className="btn btn-medium btn-arrow outline-dark mt-3 btn-color d-flex align-items-center justify-content-center"
                  >
                    <span className="text-uppercase lxgw-wenkai-mono-tc-regular">
                      關於我們
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FrontPageCarousel />
      {/* 最新消息 */}
      <section
        id="trending-products"
        className="news-section background2 position-relative"
      >
        <News />
        <div>
          <Image
            src="pics/background-pic1 (1).png"
            className="pic1 position-absolute"
            width={300}
            height={300}
            alt=""
          />
        </div>
      </section>
      {/* <!-- 照片分割 --> */}
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlow-小圖檔/DSC00587.jpg"
              alt=""
              width={600}
              height={300}
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlow-小圖檔/DSC00694.jpg"
              alt=""
              width={600}
              height={300}
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlow-小圖檔/DSC00583.jpg"
              alt=""
              width={600}
              height={300}
            />
          </div>
          <div className="col-lg-3 col-md-6 p-0">
            <Image
              className="frontpageImage"
              src="images/mudanlow-小圖檔/DSC00699.jpg"
              alt=""
              width={600}
              height={300}
            />
          </div>
        </div>
      </div>
      {/* <!-- 關於我們&徵才資訊 --> */}
      <section className=" section-secondary-color background2">
        <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle">
          關於我們
        </h2>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-4">
              <div className="aboutHire">
                <Image
                  className="aboutHireImage"
                  src="images/mudanlow-小圖檔/DSC00567.jpg"
                  alt=""
                  width={400}
                  height={300}
                />
                <button className="mt-5 lxgw-wenkai-mono-tc-light">
                  場地介紹
                </button>
              </div>
            </div>
            <div className="col-4">
              <h3>場地介紹</h3>
              <p className="text-center">
                我們的餐廳環境溫馨雅緻，裝潢別緻，擁有舒適的座椅和柔和的燈光。寬敞的用餐區和私密的包廂滿足不同需求，適合家庭聚餐、商務宴請和浪漫約會。
              </p>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-4 text-end">
              <h3>人才招募</h3>
              <p className="text-center">
                我們的餐廳正在招募熱情、有責任心的員工。無論您是廚師、服務員還是管理人員，我們都歡迎您的加入。提供良好的工作環境和培訓機會，讓您在這裡成長和發展。
              </p>
            </div>
            <div className="col-4">
              <div className="aboutHire">
                <Image
                  className="aboutHireImage"
                  src="images/mudanlow-小圖檔/DSC00691.jpg"
                  alt=""
                  width={400}
                  height={300}
                />
                <button className="mt-5 lxgw-wenkai-mono-tc-light">
                  人才招募
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 地圖 --> */}
      <section id="collections" className="position-relative background1">
        <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle2">地圖</h2>
        <div className="container-fluid d-flex justify-content-center">
          <Image src="pics/map.png" alt="" width={1000} height={600} />
        </div>
        <div className="swiper-pagination position-absolute text-center"></div>
      </section>

      {/* 留言板 */}
      <MessageBoard />
      {/* <Footer /> */}
      {/* </MudanlowLayout> */}
    </>
  )
}
