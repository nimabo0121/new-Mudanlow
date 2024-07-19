import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart-state'
import Link from 'next/link'
import Swal from 'sweetalert2'
import Navbar from '@/components/layout/mudanlow-layout/navbar'
import NavbarLogin from '@/components/layout/mudanlow-layout/navbar-login'
import Footer from '@/components/layout/mudanlow-layout/footer'

export default function CartIndex() {
  const { cart, increment, decrement, removeItem, applyCoupon } = useCart()

  const [couponsOptions, setCouponsOptions] = useState([
    {
      user_id: 0,
      member_name: '',
      coupons_sentDate: '',
      coupons_maxAge: '',
      coupons_sample_price: 0,
      car_id: '',
    },
  ])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [coupon, setCoupon] = useState(0)

  const { auth } = useAuth()
  const [selectedCoupon, setSelectedCoupon] = useState(0)

  useEffect(() => {
    if (auth.userData.id) {
      fetch(`http://localhost:3005/api/coupons/historyCar/${auth.userData.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data.result)) {
            setCouponsOptions(data.result)
          } else {
            setCouponsOptions([data.result])
          }
          setMessage(data.message || '')
          setError('')
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch session')
          setCouponsOptions([
            {
              user_id: 0,
              member_name: '',
              coupons_sentDate: '',
              coupons_maxAge: '',
              coupons_sample_price: 0,
              car_id: '',
            },
          ])
          setMessage('')
        })
    }
  }, [auth.userData.id])

  // 處理折價卷應用
  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      applyCoupon(parseFloat(selectedCoupon.coupons_sample_price))
    }
  }

  // 寫入折價卷資料庫已使用
  const handleUseCoupon = () => {
    if (selectedCoupon) {
      fetch(`http://localhost:3005/api/coupons/edit/${auth.userData.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          user_id: auth.userData.id,
          cs_id: selectedCoupon.cs_id,
        },
        body: JSON.stringify({
          user_id: auth.userData.id,
          cs_id: selectedCoupon.cs_id,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.output.success) {
            setMessage('折價卷已使用')
            Swal.fire({
              title: '成功!',
              text: '折價卷已被使用',
              icon: 'success',
              confirmButtonText: '確認',
            }).then(() => {
              setTimeout(() => {
                window.location.href = '/'
              }, 3000)
            })
          } else {
            setError('折價卷使用失敗')
            Swal.fire({
              title: '失敗!',
              text: '折價卷使用失敗',
              icon: 'error',
              confirmButtonText: '確認',
            })
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to update coupon')
        })
    }
  }

  return (
    <>
      {/* {auth.isAuth ? <NavbarLogin /> : <Navbar />} */}
      <div className="bodycart justify-content-center">
        <div className="col-lg-10">
          <div className="row">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">購物車</h4>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">名稱</th>
                      <th scope="col">單價</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                      <th scope="col">移除</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              onClick={() => decrement(item.id)}
                              className="btn btn-outline-secondary btn-sm mx-1"
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              onClick={() => increment(item.id)}
                              className="btn btn-outline-secondary btn-sm mx-1"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{item.price * item.quantity}</td>
                        <td>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="btn btn-danger btn-sm"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                    {cart.isEmpty && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          購物車為空
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div>
                  <select
                    value={
                      selectedCoupon ? selectedCoupon.coupons_sample_price : ''
                    }
                    onChange={(e) => {
                      const selectedOption = couponsOptions.find(
                        (option) =>
                          option.coupons_sample_price.toString() ===
                          e.target.value
                      )
                      setSelectedCoupon(selectedOption)
                    }}
                    className="form-select form-select-sm mb-3"
                    aria-label="Large select example w-50"
                  >
                    <option value="">請選擇要使用的折價卷</option>
                    {couponsOptions.length > 0 &&
                      couponsOptions.map((v, i) => (
                        <option key={i} value={v.coupons_sample_price}>
                          折價金額: {v.coupons_sample_price}
                        </option>
                      ))}
                  </select>
                  {message && <p>{message}</p>}
                  <div className="d-flex justify-flex-start ">
                    <button
                      onClick={handleApplyCoupon}
                      className="btn btn-primary me-2"
                    >
                      計算折價金額
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleUseCoupon}
                    >
                      確認使用折價卷
                    </button>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mt-3">
                  <span>數量： {cart.totalItems}</span>
                  <span>總計：{cart.totalPrice}</span>
                </div>
              </div>
              <div className="card-footer mb-3">
                <Link href="./cart/line-pay/order">
                  <button className="btn btn-primary w-100">下一步</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}

      <style jsx>{`
        .bodycart {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-image: url('/images/product/bg/mudan.webp');
          background-size: cover;
          background-position: center;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .card {
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid #dee2e6;
          border-radius: 0.25rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          margin-bottom: 20px;
          width: 100vh;
          height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-body {
          padding: 20px;
        }

        .card-footer {
          padding: 0;
        }

        .card-title {
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 1.5rem;
          text-align: center;
          color: #d2691e;
          border-bottom: 2px solid #d2691e;
        }

        .table th,
        .table td {
          text-align: center;
          vertical-align: middle;
          padding: 20px 10px; /* 增加行高 */
        }

        .table-hover tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }

        .btn-primary {
          display: inline-block;
          font-weight: 600;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          background-color: #d2691e;
          border: 1px solid #d2691e;
          padding: 0.75rem 1.25rem;
          font-size: 1.25rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          cursor: pointer;
          width: 100%;
        }

        .btn-primary:hover {
          background-color: #a64b00;
          border-color: #a64b00;
        }

        .btn-outline-secondary {
          font-weight: 600;
        }

        .image-section img {
          max-width: 100%;
          height: auto;
          border-radius: 0.25rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }

        .arrow {
          transition: transform 0.3s ease-in-out;
        }

        .arrow.active {
          animation: arrow-flow 1s infinite;
        }

        @keyframes arrow-flow {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
