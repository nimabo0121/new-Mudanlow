import React, { useState } from 'react'
import styles from './navbar.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { logout } from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'
import { initUserData, useAuth } from '@/hooks/use-auth'

export default function NavbarLogin() {
  const [isCanvasActive, setIsCanvasActive] = useState(false)
  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const { setAuth } = useAuth()

  const toggleCanvas = () => {
    setIsCanvasActive(!isCanvasActive)
  }

  const toggleDropdown = (e) => {
    e.preventDefault()
    setIsDropdownActive(!isDropdownActive)
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action()
    }
  }

  // 處理登出
  const handleLogout = async (e) => {
    e.preventDefault()
    const res = await logout()
    console.log('Logout Response:', res.data)

    console.log(res.data)

    // 成功登出個回復初始會員狀態
    if (res.data.status === 'success') {
      toast.success('已成功登出')

      setAuth({
        isAuth: false,
        userData: initUserData,
      })
    } else {
      toast.error(`登出失敗`)
    }
  }

  return (
    <>
      <div className={styles.stickyNavbar}>
        <div className="d-flex">
          <Link
            href="/"
            data-nav-section="frontpage"
            className={styles.navLink}
          >
            主頁
          </Link>
          <div className={styles.navItem}>
            <a href="#" data-nav-section="about" className={styles.navLink}>
              關於我們
            </a>
            <div className={styles.dropdownContent}>
              <Link href="/mudanlow/about-us/introduce">區域介紹</Link>
              <Link href="/mudanlow/news/news-list">最新消息</Link>
              <Link href="/mudanlow/about-us/hire">人才招募</Link>
            </div>
          </div>
          <Link href="/menu" data-nav-section="menu" className={styles.navLink}>
            菜單
          </Link>
          <Link
            href="/product"
            data-nav-section="shopping"
            className={styles.navLink}
          >
            購物專區
          </Link>
        </div>
        <div className="logo-link">
          <a href="#" data-nav-section="home">
            <Image
              className={styles.navbarLogo}
              src="/pics/logo-gold.png"
              width={180}
              height={50}
              alt="Logo"
              priority
            />
          </a>
        </div>
        <div className="d-flex">
          <a href="#" data-nav-section="reservation" className={styles.navLink}>
            立即預約
          </a>
          <a href="#" data-nav-section="order" className={styles.navLink}>
            我的訂單
          </a>
          <Link
            href="/member/profile"
            data-nav-section="sign"
            className={styles.navLink}
          >
            會員專區
          </Link>
          <Link
            onClick={handleLogout}
            href="/"
            data-nav-section="login"
            className={styles.navLink}
          >
            登出
          </Link>
        </div>
        <div
          className={`${styles.hamburger} ${
            isCanvasActive ? styles.active : ''
          }`}
          onClick={toggleCanvas}
          onKeyDown={(e) => handleKeyPress(e, toggleCanvas)}
          id="hamburger"
          tabIndex={0}
          role="button"
          property=""
        >
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
      </div>
      <div
        className={`${styles.offcanvasContent} ${
          isCanvasActive ? styles.active : ''
        }`}
        id="offcanvas"
      >
        <ul>
          <li>
            <a href="#" className={styles.canvasLink}>
              <div>主頁</div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`${styles.canvasLink} ${
                isDropdownActive ? styles.open : ''
              }`}
              id="aboutUsLink"
              onClick={toggleDropdown}
              onKeyPress={(e) => handleKeyPress(e, toggleDropdown)}
              tabIndex={0}
            >
              <div>
                關於我們{' '}
                <FontAwesomeIcon
                  icon={faCaretUp}
                  height={20}
                  className={styles.faCaretUp}
                />
                <FontAwesomeIcon
                  icon={faCaretDown}
                  height={20}
                  className={styles.faCaretDown}
                />
              </div>
            </a>
            <div
              className={`${styles.dropdown} ${
                isDropdownActive ? styles.show : ''
              }`}
              id="aboutUsDropdown"
            >
              <ul className="dropdown-item">
                <li className={styles.dropdownLink}>
                  <a href="#">區域介紹</a>
                </li>
                <li className={styles.dropdownLink}>
                  <a href="#">最新消息</a>
                </li>
                <li className={styles.dropdownLink}>
                  <a href="#">人才招募</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              菜單
            </a>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              購物專區
            </a>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              立即預約
            </a>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              我的訂單
            </a>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              會員專區
            </a>
          </li>
          <li>
            <a href="#" className={styles.canvasLink}>
              登出
            </a>
          </li>
        </ul>
      </div>
      <Toaster />
    </>
  )
}
