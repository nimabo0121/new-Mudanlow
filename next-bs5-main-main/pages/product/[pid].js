import React, { useState } from 'react'
import Carousel from '@/components/product/carousel'
import { useCart } from '@/hooks/use-cart-state'
import { useRouter } from 'next/router'
import { Modal, Button } from 'react-bootstrap'

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3005/api/products')
    const responseData = await res.json()

    if (!responseData.data.products) {
      console.error('API response does not contain products')
      throw new Error('API response does not contain products')
    }

    const paths = responseData.data.products.map((product) => ({
      params: { pid: product.id.toString().padStart(2, '0') },
    }))

    return { paths, fallback: false }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps({ params }) {
  try {
    const productId = parseInt(params.pid, 10) // 去除前導零並解析為整數
    const res = await fetch(`http://localhost:3005/api/products/${productId}`)
    const responseData = await res.json()

    if (!responseData.data.product) {
      return { notFound: true }
    }

    return {
      props: {
        product: responseData.data.product,
      },
    }
  } catch (error) {
    console.error('Error fetching product details:', error)
    return { props: { product: null } }
  }
}

const ProductDetail = ({ product }) => {
  const { addItem } = useCart()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')

  if (!product) {
    return <div>Product not found</div>
  }

  const images = product.photos ? product.photos.split(',') : []

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const showModal = (name) => {
    setProductName('產品：' + name + '已成功加入購物車')
    handleShow()
  }

  return (
    <>
      <div className="row mt-5 mx-2">
        <div className="col-sm-7">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Carousel images={images} />
          </div>
        </div>
        <div className="col-sm-5">
          <h4>{product.name}</h4>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <p className="product-desc">{product.description}</p>
          <ul>
            {product.details
              ? product.details
                  .split(',')
                  .map((detail, index) => <li key={index}>{detail}</li>)
              : null}
          </ul>
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => {
              const item = { ...product, quantity: 1 }
              addItem(item)
              showModal(product.name)
            }}
          >
            加入購物車
          </button>
          <button className="btn btn-outline-primary w-100">
            <i className="bi bi-suit-heart"></i> 最愛
          </button>
          <div className="product-info my-5">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    尺寸與版型
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    <ul>
                      {product.sizeFit
                        ? product.sizeFit
                            .split(',')
                            .map((size, index) => <li key={index}>{size}</li>)
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    免費寄送及退貨
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    <p>{product.shippingInfo}</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    評價({product.reviews ? product.reviews.length : 0}){'  '}
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    {product.reviews ? (
                      product.reviews.map((review, index) => (
                        <div className="commet" key={index}>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="star">
                                &#9733;
                              </span>
                            ))}
                          </div>
                          <p>
                            {review.commenter} - {review.date}
                          </p>
                          <p>{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p>暫無評論</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 mx-2">
        <div className="col-sm-12">
          <h4 className="text-center mb-5">探索 {product.name}</h4>
          {product.imagesDetail
            ? product.imagesDetail.map((image, index) => (
                <div key={index} className="text-center my-5">
                  <img className="w-100 my-5" src={image.src} alt={image.alt} />
                  <p className="my-5 font-weight-light fs-4">
                    {image.description}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              router.push('/cart')
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductDetail
