import { useEffect, useState } from 'react'

// assets
import authImage from '../../assets/system/auth-image.png'
import logo from '../../assets/system/card-vault-logo.png'

// components
import CreateAccount from './components/create-account/CreateAccount'
import SignIn from './components/sign-in/SignIn'

// context
import { useGradientContext } from '../../contexts/gradient-context/useGradientContext'

// data
import { GRADIENT_DATA } from '../../data/gradient-data'

// styles
import './AuthPage.scss'

export default function AuthPage() {
    const { generatedGradients, selectedGradients, dispatch } = useGradientContext()
    const [authToggle, setAuthToggle] = useState(null)
    
    useEffect(() => {
        setAuthToggle('signin')
        var keys = Object.keys(GRADIENT_DATA)
        var team = GRADIENT_DATA[keys[keys.length * Math.random() << 0]]
        dispatch({ type: 'GENERATE_BG', payload: team})
    }, [dispatch])

    return (
            <>
                {generatedGradients && 
                    <div
                        className='auth-page-wrap'
                        style={
                            {
                                background: `radial-gradient(circle, 
                                    rgba(${!selectedGradients ? generatedGradients['0'] : selectedGradients['0']}) 25%,
                                    rgba(${!selectedGradients ? generatedGradients['1'] : selectedGradients['1']}) 100%)`
                            }
                        }
                    >
                        <div
                            className='left-col'
                            style={
                                {
                                    width: `${authToggle === 'signin' ? '50%' : '100%'}`
                                }
                            }
                        > 
                            <div className='left-col-content'>
                                <div className='logo-container'>
                                    <img src={logo} alt='' />
                                </div>
                                <div className='toggle-container'>
                                    <div className='toggle-option'>
                                        <h3 className={authToggle === 'signin' ? 'underline' : ''} onClick={() => setAuthToggle('signin')}>SIGN IN</h3>
                                    </div>
                                    <div className='toggle-option'>
                                        <h3 className={authToggle === 'createanaccount' ? 'underline' : ''} onClick={() => setAuthToggle('createanaccount')}>CREATE AN ACCOUNT</h3>
                                    </div>
                                </div>
                                {authToggle === 'signin' ? <SignIn /> : <CreateAccount />}
                            </div>
                        </div>
                        {authToggle === 'signin' && 
                            <div className='right-col'>
                                <div className='auth-image-container'>
                                    <img src={authImage} alt='' />
                                </div>
                            </div>
                        }
                    </div>
                }
            </>
    )
}
