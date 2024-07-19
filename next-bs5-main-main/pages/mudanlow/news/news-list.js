import React, { useState, useEffect } from 'react'
import Footer from '@/components/layout/mudanlow-layout/footer'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function NewsList() {
  const [articles, setArticles] = useState([])

  const getArticles = () => {
    fetch('http://localhost:3005/api/articles/api')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data)
        if (data.success) {
          console.log('Fetched articles:', data.rows)
          setArticles(data.rows || [])
        } else {
          console.log('獲取評論失敗')
        }
      })
      .catch((error) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(error)
        setArticles([]) // 確保在發生錯誤時也設置 articles 為空陣列
      })
  }

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    console.log('Articles state:', articles)
    const contents = document.querySelectorAll('.content')

    contents.forEach((content, index) => {
      setTimeout(() => {
        content.classList.add('show')
      }, index * 300) // 每個元素延遲 300ms
    })
  }, [articles])

  const truncateContent = (content, maxLength = 30) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...'
    }
    return content
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="position-relative">
          <button className="btn btn-success back-btn">
            <Link href="/">回上頁</Link>
          </button>
          <div className="row justify-content-center text-center keyword-title">
            <div className="col-4">
              <h1>關鍵字</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="d-flex flex-wrap justify-content-center text-center hashtag text-nowrap">
          <div className="col-lg-2 col-3 fs-4 keyword" data-value={1}>
            #所有文件
          </div>
          <div className="col-lg-2 col-3 fs-4 keyword" data-value={2}>
            #新菜消息
          </div>
          <div className="col-lg-2 col-3 fs-4 keyword" data-value={3}>
            #節慶活動
          </div>
        </div>
        <div className="d-flex justify-content-center text-center hashtag text-nowrap">
          <div className="col-lg-2 col-3 fs-4 keyword" data-value={4}>
            #公休時間
          </div>
          <div className="col-lg-2 col-3 fs-4 keyword" data-value={5}>
            #貓咪認養
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <ul className="list-unstyled" id="news-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.a_id}>
                <div className="content fade-in">
                  <div className="w-25 my-2 text-secondary">{article.date}</div>
                  <div className="w-50 fw-bolder my-2">{article.title}</div>
                  <div className="d-flex justify-content-between position-relative">
                    <div className="inside-content w-75 py-4">
                      {truncateContent(article.content)}
                    </div>
                    <div className="position-absolute end-0 ">
                      <Link href={`/mudanlow/news/${article.a_id}`}>
                        <FontAwesomeIcon icon={faChevronRight} height={30} />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>無文章可顯示</li>
          )}
        </ul>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination" id="pagination">
          <li className="page-item">
            <a className="page-link" href="">
              1
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <button id="scrollToTopBtn" onClick={scrollToTop}>
          回到頂部
        </button>
      </div>
      <Footer />
      <style jsx>{`
        .SlideMediaBox {
          background-color: cornflowerblue;
          text-align: center;
        }

        .back-btn {
          top: 100px;
          left: 100px;
          position: relative;
        }

        .hashtag {
          margin-top: 30px;
        }

        .content {
          width: 700px;
          height: 150px;
          border-bottom: 2px solid black;
          margin-bottom: 20px;
          margin-top: 20px;
          padding-left: 5px;
          border-radius: 10px 10px 0 0;
          transition: transform 0.3s ease;
        }

        .content:hover {
          box-shadow: 0 0 11px rgba(33, 33, 33, 0.3);
          transform: scale(1.05);
        }

        @media (max-width: 800px) {
          .content {
            width: 450px;
          }

          .back-btn {
            top: 100px;
            left: 20px;
          }
        }

        a {
          color: inherit;
          text-decoration: inherit;
          cursor: inherit;
          cursor: pointer;
        }

        .pagination {
          display: flex;
          justify-content: center;
          list-style-type: none;
          padding: 0;
        }

        .pagination li {
          margin: 0 5px;
        }

        .pagination li a {
          display: block;
          padding: 5px 10px;
          text-decoration: none;
          border: 1px solid #ccc;
          border-radius: 3px;
          color: black;
          background-color: #fff;
        }

        .page-link:hover {
          background-color: #336e53;
          color: #fff;
        }

        .page-item.active .page-link {
          background-color: #458068;
          border-color: #458068;
          color: #fff;
        }

        .page-link {
          color: #458068;
        }

        #scrollToTopBtn {
          display: none;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #fefef6;
          color: #366e53;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          opacity: 0.5;
        }

        .keyword {
          cursor: pointer;
          text-shadow: 1px 1px gray;
          font-weight: 900;
        }

        .keyword-title {
          margin-top: 80px;
        }

        .fade-in {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in.show {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 540px) {
          .content {
            width: 100%;
            font-size: 16px;
            text-wrap: nowrap;
          }

          .hashtag {
            flex-direction: column;
            margin: 0;
          }

          .hashtag .keyword {
            width: auto;
            flex: 1;
          }
        }

        @media (min-width: 541px) and (max-width: 720px) {
          .content {
            width: 500px;
            font-size: 18px;
          }
        }

        @media (min-width: 721px) and (max-width: 960px) {
          .content {
            width: 700px;
            font-size: 18px;
          }
        }

        @media (min-width: 961px) and (max-width: 1140px) {
          .content {
            width: 700px;
            font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}
