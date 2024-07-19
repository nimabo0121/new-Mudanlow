import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import FirstPicture from '@/components/mudanlow/frontpage/first-pic'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import Footer from '@/components/layout/mudanlow-layout/footer'
import FrontPageCarousel from '@/components/mudanlow/frontpage/carousel'

export default function MudanlowIndex() {
  return (
    <>
      <FirstPicture />
      <Navbar />
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
        <div className="container-fluid ">
          <div className="row overflow-hidden">
            <div className="display-header pb-3 col-md-12">
              <h2 className="display-4 lxgw-wenkai-mono-tc-bold title">
                最新消息
              </h2>
              {/* <!--put your content inside--> */}
            </div>
            <div className="container-fluid d-flex justify-content-center my-3 newsSection">
              <div className="news p-4 bg-light m-3">
                <div className="border-bottom border-dark">
                  <h1 className="lxgw-wenkai-mono-tc-regular">最新消息</h1>
                </div>
                <div className="bg-light">
                  <ul className="list-unstyled">
                    <li className="newsList">
                      <div className="border-bottom border-dark row align-items-center py-3 list">
                        <div className="col-4 ">
                          <div className="text-secondary ">123</div>
                          <div className="fw-bolder ">456</div>
                        </div>
                        <div className="col-7 ">1234</div>
                        <div className="col-1 ">
                          <a href="" title="查看文章">
                            <div className="news-arrow">
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className="news-arrow"
                                height={30}
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="position-relative p-2">
                  <nav className="buttons position-absolute bottom-0 end-0">
                    <a
                      className="more-btn"
                      href="./news-list.php"
                      data-button="more"
                    >
                      MORE...
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      {/* 留言板 */}
      <section
        id="message-board"
        className="section-secondary-color background2"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="display-header pb-3 col-md-12">
              <h2 className="display-4 lxgw-wenkai-mono-tc-bold title">
                留言板
              </h2>
            </div>
            <div className="d-flex justify-content-center align-items-center text-center">
              <div className="container-fluid">
                <div className="row">
                  <div className="display-header pb-3 col-md-12 d-flex justify-content-center align-items-center text-center">
                    {/* <!--put your content inside--> */}
                    <div className="row gx-4 gx-lg-5 m-3 justify-content-center messageBoard flex-column align-items-center">
                      <div className="text-center mb-3">
                        <h2 className="lxgw-wenkai-mono-tc-bold">
                          寫下你想說的話吧~
                        </h2>
                      </div>
                      <div className="text-center mb-3">
                        <label htmlFor="" className="lxgw-wenkai-mono-tc-bold">
                          請給我們評分:
                        </label>
                        <form id="message" onSubmit="sendData(event)">
                          <div className="score">
                            <input
                              type="radio"
                              name="value"
                              id="score5"
                              value="5"
                            />
                            <label className="star" htmlFor="score5"></label>

                            <input
                              type="radio"
                              name="value"
                              id="score4"
                              value="4"
                            />
                            <label className="star" htmlFor="score4"></label>

                            <input
                              type="radio"
                              name="value"
                              id="score3"
                              value="3"
                            />
                            <label className="star" htmlFor="score3"></label>

                            <input
                              type="radio"
                              name="value"
                              id="score2"
                              value="2"
                            />
                            <label className="star" htmlFor="score2"></label>

                            <input
                              type="radio"
                              name="value"
                              id="score1"
                              value="1"
                            />
                            <label className="star" htmlFor="score1"></label>
                          </div>
                          <div className="mb-3">
                            <label className="form-label lxgw-wenkai-mono-tc-bold">
                              輸入內容:
                            </label>
                            <textarea
                              className="form-control"
                              id="textContent"
                              name="content"
                              rows="5"
                            ></textarea>
                          </div>
                          <button
                            className="btn btn-light lxgw-wenkai-mono-tc-bold btn-color"
                            type="submit"
                          >
                            送出
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="display-header pb-3 col-md-12">
                    {/* <!--put your content inside--> */}
                    <div className="d-flex justify-content-center align-items-center text-center mb-3 commentBoard m-3">
                      <div className="row align-items-center">
                        <ul className="list-unstyled" id="comment-list">
                          {/* <!-- 迭代顯示留言 --> */}
                          <li className="comments">
                            <h2 className="text-center lxgw-wenkai-mono-tc-bold">
                              留言板
                            </h2>
                            {/* <!-- 顯示留言的內容和評分 --> */}
                            <div className="lxgw-wenkai-mono-tc-regular">
                              編號:
                            </div>
                            <label
                              htmlFor=""
                              className="lxgw-wenkai-mono-tc-regular"
                            >
                              評分:
                            </label>
                            <div className="comment-star text-center"></div>
                            <label className="lxgw-wenkai-mono-tc-regular">
                              內容:
                            </label>
                            <div className="comment-content"></div>
                            <div className="lxgw-wenkai-mono-tc-regular">
                              留言時間:
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 地圖 --> */}
      <section id="collections" className="position-relative background1">
        <h2 className="display-4 lxgw-wenkai-mono-tc-bold title2">地圖</h2>
        <div className="container-fluid d-flex justify-content-center">
          <Image src="pics/map.png" alt="" width={1000} height={600} />
        </div>
        <div className="swiper-pagination position-absolute text-center"></div>
      </section>
      {/* <!-- 關於我們&徵才資訊 --> */}
      <section className=" section-secondary-color background2">
        <div className="container">
          <div className="row d-flex justify-content-evenly align-items-center">
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
      <Footer />
    </>
  )
}
