import classNames from 'classnames/bind'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FacebookIcon, GithubIcon, GoogleIcon, LogoIcon } from '../../components/Icons'
import { auth } from '../../config/firebase'
import { useTitle } from '../../hooks'
import { createUserDocument } from '../../services/firebase'
import styles from './Auth.module.scss'

const cx = classNames.bind(styles)

const Auth = () => {
    const localtion = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [user, loading] = useAuthState(auth)

    useTitle(`${localtion.pathname === '/login' ? 'Đăng nhập vào Dev-Music' : 'Đăng ký tài khoản Dev-Music'}`)

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    const signInWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider())
            createUserDocument(response.user)
            navigate('/')
        } catch (err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                setError(`Email ${err.customData.email} đã được sử dụng bởi một phương thức đăng nhập khác Google.`)
            }
        }
    }

    const signInWithFacebook = async () => {
        try {
            const response = await signInWithPopup(auth, new FacebookAuthProvider())
            if (response) {
                createUserDocument(response.user)
                navigate('/')
            }
        } catch (err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                setError(`Email ${err.customData.email} đã được sử dụng bởi một phương thức đăng nhập khác Facebook.`)
            }
        }
    }

    const signInWithGithub = async () => {
        try {
            const response = await signInWithPopup(auth, new GithubAuthProvider())
            if (response) {
                createUserDocument(response.user)
                navigate('/')
            }
        } catch (err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                setError(`Email ${err.customData.email} đã được sử dụng bởi một phương thức đăng nhập khác Github.`)
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <Link to={'/'} className={cx('logo')}>
                        <LogoIcon w="4.8rem" h="4.8rem" />
                    </Link>
                    <h1 className={cx('title')}>
                        {localtion.pathname === '/login' ? 'Đăng nhập vào Dev-Music' : 'Đăng ký tài khoản Dev-Music'}
                    </h1>
                </div>
                <div className={cx('body')}>
                    <div className="body__top">
                        <div className={cx('btn')} onClick={signInWithGoogle}>
                            <span className={cx('btn__icon')}>
                                <GoogleIcon w="1.8rem" h="1.8rem" />
                            </span>
                            <span className={cx('btn__title')}>Tiếp tục với Google</span>
                        </div>
                        <div className={cx('btn')} onClick={signInWithFacebook}>
                            <span className={cx('btn__icon')}>
                                <FacebookIcon w="1.8rem" h="1.8rem" />
                            </span>
                            <span className={cx('btn__title')}>Tiếp tục với Facebook</span>
                        </div>
                        <div className={cx('btn')} onClick={signInWithGithub}>
                            <span className={cx('btn__icon')}>
                                <GithubIcon w="1.8rem" h="1.8rem" />
                            </span>
                            <span className={cx('btn__title')}>Tiếp tục với Github</span>
                        </div>
                    </div>
                    <div className={cx('body__bottom')}>
                        {error && <p className={cx('error')}>{error}</p>}
                        {localtion.pathname === '/login' ? (
                            <p className={cx('acc')}>
                                <span>Bạn chưa có tài khoản? </span>
                                <Link to={'/register'} className={cx('link')}>
                                    Đăng ký
                                </Link>
                            </p>
                        ) : (
                            <p className={cx('acc')}>
                                <span>Bạn đã có tài khoản? </span>
                                <Link to={'/login'} className={cx('link')}>
                                    Đăng nhập
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <span>
                        Việc mà bạn sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <Link to={'/'} className={cx('footer__link')}>
                            {' '}
                            Điều khoản sử dụng{' '}
                        </Link>
                        của chúng tôi
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Auth
