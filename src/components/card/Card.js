import { motion } from 'framer-motion'

// styles
import './Card.scss'

export default function Card({ img, playerName=[], canUpload=false }) {
  return (
    <motion.div
      className='card-container'
      whileHover={{ scale: 1.015 }}
    >
      {!img && 
        <div className='card-img-placeholder'>
          <div className='player-name-container'>
            {playerName.map((name) => (
              <h4 key={name}>{name}</h4>
            ))}
          </div>
          {canUpload &&
            <input
              type="file"
              style={{backgroundColor:'#459948', width:'225px'}}
            />
          }
        </div>
      }
      {img && <img src={img} alt='' /> }
    </motion.div>
  )
}