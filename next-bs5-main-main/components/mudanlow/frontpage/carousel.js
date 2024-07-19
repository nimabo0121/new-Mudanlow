import React, { useEffect, useRef } from 'react'

export default function FrontPageCarousel() {
  const cardsContainerRef = useRef(null)
  const cardsControllerRef = useRef(null)

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current
    const cardsController = cardsControllerRef.current

    if (!cardsContainer) return

    // Class definitions
    class DraggingEvent {
      constructor(target = undefined) {
        this.target = target
      }

      event(callback) {
        let handler

        this.target.addEventListener('mousedown', (e) => {
          e.preventDefault()

          handler = callback(e)

          window.addEventListener('mousemove', handler)

          document.addEventListener('mouseleave', clearDraggingEvent)

          window.addEventListener('mouseup', clearDraggingEvent)

          function clearDraggingEvent() {
            window.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup', clearDraggingEvent)

            document.removeEventListener('mouseleave', clearDraggingEvent)

            handler(null)
          }
        })

        this.target.addEventListener('touchstart', (e) => {
          handler = callback(e)

          window.addEventListener('touchmove', handler)

          window.addEventListener('touchend', clearDraggingEvent)

          document.body.addEventListener('mouseleave', clearDraggingEvent)

          function clearDraggingEvent() {
            window.removeEventListener('touchmove', handler)
            window.removeEventListener('touchend', clearDraggingEvent)

            handler(null)
          }
        })
      }

      // Get the distance that the user has dragged
      getDistance(callback) {
        function distanceInit(e1) {
          let startingX, startingY

          if ('touches' in e1) {
            startingX = e1.touches[0].clientX
            startingY = e1.touches[0].clientY
          } else {
            startingX = e1.clientX
            startingY = e1.clientY
          }

          return function (e2) {
            if (e2 === null) {
              return callback(null)
            } else {
              if ('touches' in e2) {
                return callback({
                  x: e2.touches[0].clientX - startingX,
                  y: e2.touches[0].clientY - startingY,
                })
              } else {
                return callback({
                  x: e2.clientX - startingX,
                  y: e2.clientY - startingY,
                })
              }
            }
          }
        }

        this.event(distanceInit)
      }
    }

    class CardCarousel extends DraggingEvent {
      constructor(container, controller = undefined) {
        super(container)

        // DOM elements
        this.container = container
        this.controllerElement = controller
        this.cards = Array.from(container.querySelectorAll('.ImgCard'))

        // Carousel data
        this.centerIndex = (this.cards.length - 1) / 2
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100
        this.xScale = {}

        // Resizing
        window.addEventListener('resize', this.updateCardWidth.bind(this))

        if (this.controllerElement) {
          this.controllerElement.addEventListener(
            'keydown',
            this.controller.bind(this)
          )
        }

        // Initializers
        this.build()

        // Bind dragging event
        super.getDistance(this.moveCards.bind(this))
      }

      updateCardWidth() {
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100

        this.build()
      }

      build(fix = 0) {
        this.cards.forEach((card, i) => {
          const x = i - this.centerIndex
          const scale = this.calcScale(x)
          const scale2 = this.calcScale2(x)
          const zIndex = -Math.abs(i - this.centerIndex)

          const leftPos = this.calcPos(x, scale2)

          this.xScale[x] = card

          this.updateCards(card, {
            x: x,
            scale: scale,
            leftPos: leftPos,
            zIndex: zIndex,
          })
        })
      }

      controller(e) {
        const temp = { ...this.xScale }

        if (e.keyCode === 39) {
          // Left arrow
          for (let x in this.xScale) {
            const newX =
              parseInt(x) - 1 < -this.centerIndex
                ? this.centerIndex
                : parseInt(x) - 1

            temp[newX] = this.xScale[x]
          }
        }

        if (e.keyCode == 37) {
          // Right arrow
          for (let x in this.xScale) {
            const newX =
              parseInt(x) + 1 > this.centerIndex
                ? -this.centerIndex
                : parseInt(x) + 1

            temp[newX] = this.xScale[x]
          }
        }

        this.xScale = temp

        for (let x in temp) {
          const scale = this.calcScale(x),
            scale2 = this.calcScale2(x),
            leftPos = this.calcPos(x, scale2),
            zIndex = -Math.abs(x)

          this.updateCards(this.xScale[x], {
            x: x,
            scale: scale,
            leftPos: leftPos,
            zIndex: zIndex,
          })
        }
      }

      calcPos(x, scale) {
        let formula

        if (x < 0) {
          formula = (scale * 100 - this.cardWidth) / 2

          return formula
        } else if (x > 0) {
          formula = 100 - (scale * 100 + this.cardWidth) / 2

          return formula
        } else {
          formula = 100 - (scale * 100 + this.cardWidth) / 2

          return formula
        }
      }

      updateCards(card, data) {
        if (data.x || data.x === 0) {
          card.setAttribute('data-x', data.x)
        }

        if (data.scale || data.scale === 0) {
          card.style.transform = `scale(${data.scale})`

          if (data.scale === 0) {
            card.style.opacity = data.scale
          } else {
            card.style.opacity = 1
          }
        }

        if (data.leftPos) {
          card.style.left = `${data.leftPos}%`
        }

        if (data.zIndex || data.zIndex === 0) {
          if (data.zIndex === 0) {
            card.classList.add('highlight')
          } else {
            card.classList.remove('highlight')
          }

          card.style.zIndex = data.zIndex
        }
      }

      calcScale2(x) {
        let formula

        if (x <= 0) {
          formula = 1 - (-1 / 5) * x

          return formula
        } else if (x > 0) {
          formula = 1 - (1 / 5) * x

          return formula
        }
      }

      calcScale(x) {
        const formula = 1 - (1 / 5) * Math.pow(x, 2)

        if (formula <= 0) {
          return 0
        } else {
          return formula
        }
      }

      checkOrdering(card, x, xDist) {
        const original = parseInt(card.dataset.x)
        const rounded = Math.round(xDist)
        let newX = x

        if (x !== x + rounded) {
          if (x + rounded > original) {
            if (x + rounded > this.centerIndex) {
              newX =
                x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex
            }
          } else if (x + rounded < original) {
            if (x + rounded < -this.centerIndex) {
              newX =
                x + rounded + 1 + this.centerIndex - rounded + this.centerIndex
            }
          }

          this.xScale[newX + rounded] = card
        }

        const temp = -Math.abs(newX + rounded)

        this.updateCards(card, { zIndex: temp })

        return newX
      }

      moveCards(data) {
        let xDist

        if (data !== null) {
          this.container.classList.remove('smooth-return')
          xDist = data.x / 250
        } else {
          this.container.classList.add('smooth-return')
          xDist = 0

          for (let x in this.xScale) {
            this.updateCards(this.xScale[x], {
              x: x,
              zIndex: Math.abs(Math.abs(x) - this.centerIndex),
            })
          }
        }

        this.cards.forEach((card, i) => {
          const x = this.checkOrdering(card, parseInt(card.dataset.x), xDist)
          const scale = this.calcScale(x + xDist)
          const scale2 = this.calcScale2(x + xDist)
          const leftPos = this.calcPos(x + xDist, scale2)

          this.updateCards(card, {
            scale: scale,
            leftPos: leftPos,
          })
        })
      }
    }

    // Initialize carousel
    const carousel = new CardCarousel(cardsContainer)

    // Clean-up
    return () => {
      // Clean-up listeners or any other actions if needed
    }
  }, []) // Only run once on mount

  return (
    <section
      id="trending-products"
      className="section-secondary-color background1"
    >
      <div className="row d-flex justify-content-center">
        <div className="col-4 text-center">
          <h2 className="display-4 lxgw-wenkai-mono-tc-bold frontTitle">
            餐點介紹
          </h2>
          <div className="text-center frontTitle text-dark ">
            我們餐廳提供豐富多樣的美食選擇，從精緻的開胃小菜到美味的主菜和甜品，每道菜品均選用新鮮食材，精心烹製。無論是傳統風味還是創新料理，都能滿足您的味蕾。邀請您來享受一場美食盛宴。
          </div>
        </div>
        <div className="col-8">
          <div className="container-fluid d-flex justify-content-center position-relative">
            <div className="container lxgw-wenkai-mono-tc-regular">
              <div ref={cardsContainerRef} className="cardCarousel">
                <div className="ImgCard" id="1">
                  <div className="imageContainer"></div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
                <div className="ImgCard" id="2">
                  <div className="imageContainer"></div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
                <div className="ImgCard" id="3">
                  <div className="imageContainer"></div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
                <div className="ImgCard" id="4">
                  <div className="imageContainer"></div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
                <div className="ImgCard" id="5">
                  <div className="imageContainer"></div>
                  <button className="carouselBtn">查看菜單</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
