// assets
import logo from '../../assets/system/card-vault-logo.png'

// styles
import './Footer.scss'

export default function Footer() {
  return (
    <footer>
        <img src={logo} alt='' />
        <h6>Copyright 2022 CardVault. All rights reserved.</h6>
        <div className='footer-resources'>
            <h5>PRIVACY POLICY</h5>
            <h5>TERMS & CONDITIONS</h5>
        </div>
    </footer>
  )
}
