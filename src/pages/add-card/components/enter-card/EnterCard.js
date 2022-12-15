import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import Card from '../../../../components/card/Card'
import InputBar from '../../../../components/input-bar/InputBar'
import InputsContainer from '../../../../components/inputs-container/InputsContainer'
import PrimaryBtn from '../../../../components/btns/primary-btn/PrimaryBtn'
import TertiaryBtn from '../../../../components/btns/tertiary-btn/TertiaryBtn'

// context
import { useCardsContext } from '../../../../contexts/cards-context/useCardsContext'

// firebase
// import { storage } from '../../../../utils/firebase/config'
// import { uploadBytes, ref } from 'firebase/storage'

// hooks
import { useFirestore } from '../../../../utils/firebase/config'

// styles
import './EnterCard.scss'

export default function EnterCard() {
    // const [uploadedImg, setUploadedImg] = useState(null)
    const [enteredCardNumber, setEnteredCardNumber] = useState('')
    const [cardQuantity, setCardQuantity] = useState(1)
    const [currCard, setCurrCard] = useState(null)
    const { cardData } = useCardsContext()
    const { series, category, type } = useParams()
    const { addCard } = useFirestore()

    const handleClick = () => {
        if (!currCard) {
            alert("Card not found.")
        } else {
            if (!cardData) {
                alert("Error loading cards.")
            } else {
                // uploadImg(uploadedImg)
                addCard(series, category, type, currCard, cardQuantity)
                    .then(() => {
                        alert('Card added!')
                    })
            }
        }  
    }

    useEffect(() => {
        if (enteredCardNumber === '') {
            setCurrCard(null)
        } else {   
            if (enteredCardNumber) {
                if (cardData) {
                    const lowerRange = cardData[0].cardNumber
                    const upperRange = cardData[cardData.length - 1].cardNumber
                    if (parseInt(enteredCardNumber) >= lowerRange && parseInt(enteredCardNumber) <= upperRange) {
                        setCurrCard(cardData[enteredCardNumber - lowerRange])
                    } else {
                        setCurrCard(null)
                    }
                } else {
                    setCurrCard(null)
                }
            } else {
                setCurrCard(null)
            }
        }
    }, [cardData, enteredCardNumber])

    const adjustQuantity = (step) => {
        if (currCard !== null) {
            const currCount = cardQuantity;
            if (currCount === 1 && step === -1) {
                return
            } else if (currCount === 99 && step === 1) {
                return
            } else {
                setCardQuantity(currCount + step)
            }
        }
    }

    // const imgUploaded = (e) => {
    //     setUploadedImg(e.target.files[0])
    // }

    // const uploadImg = (e) => {
    //     const imgRef = ref(storage, `card-images/${series}/${category}/${type}/${enteredCardNumber}`)
    //     try {
    //         uploadBytes(imgRef, uploadedImg).then((snapshot) => {
    //             console.log('IMAGE UPLOADED')
    //         })
    //     } catch (err) {
    //         console.log('ERROR UPLOADING IMAGE')
    //     }
    // }

    return (
        <div className='enter-card-container'>
            <div className='card-container'>
                {!currCard && 
                    <Card />
                }
                {currCard &&
                    <Card playerName={currCard.name} />
                }
            </div>
            
            <div style={{ width:"420px"}}>
                <InputsContainer>
                    <InputBar type='text' pH='ENTER CARD NUMBER' value={enteredCardNumber.toUpperCase()} updateValue={setEnteredCardNumber}/>
                </InputsContainer>
            </div>

            <div className='enter-card-btns-container'>
                <div onClick={() => adjustQuantity(-1)}>
                    <TertiaryBtn title={"-"} route={null} disabled={currCard === null}/>
                </div>

                <div onClick={handleClick}>
                    <PrimaryBtn title={`ADD ${cardQuantity}x`} disabled={currCard === null} />
                </div>

                <div onClick={() => adjustQuantity(1)}>
                    <TertiaryBtn title={"+"} route={null} disabled={currCard === null}/>
                </div>
            </div>
        </div>
    )
}