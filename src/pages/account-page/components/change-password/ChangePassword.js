// components
import InputBar from '../../../../components/input-bar/InputBar'
import InputsContainer from '../../../../components/inputs-container/InputsContainer'
import SecondaryBtn from '../../../../components/btns/secondary-btn/SecondaryBtn'

// styles
import './ChangePassword.scss'

export default function ChangePassword() {
  return (
    <div className='change-password-container'>
        <InputsContainer>
            <InputBar type={'password'} pH={'NEW PASSWORD'} />
            <InputBar type={'password'} pH={'CONFIRM NEW PASSWORD'} />
        </InputsContainer>
        <SecondaryBtn title='UPDATE PASSWORD'/>
    </div>
  )
}