import React, { useState, useEffect } from 'react'
import styles from './messageboard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function MessageBoard() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({ value: '', content: '' })
  const [comments, setComments] = useState([])
  const maxZIndex = 1
  const maxHeight = 400 // 限制生成位置的最大高度
  const minHeight = 100 // 限

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendData = (e) => {
    e.preventDefault()

    const fd = new FormData()
    fd.append('value', rating)
    fd.append('content', formData.content)

    fetch('http://localhost:3005/api/message-board/add', {
      method: 'POST',
      body: fd,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          alert('成功送出！')
          getComments()
        } else {
          console.log('資料新增失敗')
        }
      })
      .catch((ex) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(ex)
      })
  }

  const getComments = () => {
    fetch('http://localhost:3005/api/message-board/api')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const commentsWithPosition = data.comments.map((comment, index) => ({
            ...comment,
            position: generateRandomPosition(),
            zIndex: Math.min(maxZIndex, data.comments.length - index), // 設定 z-index 並限制最大值
            animationDuration: `${Math.random() * 30 + 30}s`, // 隨機動畫時間
          }))
          setComments(commentsWithPosition)
        } else {
          console.log('獲取評論失敗')
        }
      })
      .catch((ex) => {
        console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的')
        console.log(ex)
      })
  }

  const generateRandomPosition = () => {
    const top = Math.random() * (maxHeight - minHeight) + minHeight // 設定 top 的隨機範圍
    const left = Math.random() * (window.innerWidth - 200) // 減去每個留言的寬度以防止超出視窗
    return { top, left }
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDrop = (e) => {
    const index = e.dataTransfer.getData('text/plain')
    const newComments = [...comments]
    const top = e.clientY - 50 // Adjust for element height
    const left = e.clientX - 100 // Adjust for element width
    newComments[index].position = { top, left }
    setComments(newComments)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <section
        className={`container-fluid py-5 ${styles.commentSection}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="display-4 title2">留言板</h2>
        <div
          className={`row gx-4 gx-lg-5 m-3 justify-content-center ${styles.messageBoard} flex-column align-items-center`}
        >
          <div className="col-lg-8 col-xl-7 text-center mb-3">
            <h2>寫下你想說的話吧~</h2>
          </div>
          <div className="col-lg-8 col-xl-7 text-center mb-3">
            <form id="message" onSubmit={sendData}>
              <h4>評分:</h4>
              <div className={styles.score}>
                {[1, 2, 3, 4, 5].map((score) => (
                  <React.Fragment key={score}>
                    <input
                      type="radio"
                      name="value"
                      id={`score${score}`}
                      value={score}
                      onChange={handleRatingChange}
                      className={styles.radioInput}
                    />
                    <label
                      className={styles.star}
                      htmlFor={`score${score}`}
                      onMouseEnter={() => setHoverRating(score)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{
                          color:
                            hoverRating >= score || rating >= score
                              ? '#FFD43B'
                              : '#dcdcdc',
                        }}
                        height={30}
                      />
                    </label>
                  </React.Fragment>
                ))}
              </div>
              <div className="mb-3">
                <h4 className="form-label" htmlFor="textContent">
                  輸入內容:
                </h4>
                <textarea
                  className="form-control"
                  id="textContent"
                  name="content"
                  rows="5"
                  value={formData.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button className="btn btn-light" type="submit">
                送出
              </button>
            </form>
          </div>
        </div>
        {comments.map((comment, index) => (
          <div
            className={`${styles.comments}`}
            key={comment.c_id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            style={{
              top: comment.position.top,
              left: comment.position.left,
              zIndex: comment.zIndex, // 設置 z-index
              animationDuration: comment.animationDuration, // 設置隨機動畫時間
            }}
          >
            <div className="text-light">編號: {comment.c_id}</div>
            <label className="text-light">評分:</label>
            <div className={`${styles.commentStar} text-center`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  style={{ color: i <= comment.value ? '#FFD43B' : '#dcdcdc' }}
                  height={30}
                />
              ))}
            </div>
            <label className="text-light">內容:</label>
            <div className={styles.commentContent}>{comment.content}</div>
            <div className="text-light">留言時間: {comment.created_at}</div>
          </div>
        ))}
      </section>
    </>
  )
}
