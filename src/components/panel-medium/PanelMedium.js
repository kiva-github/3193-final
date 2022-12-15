import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

// styles
import './PanelMedium.scss'

export default function PanelMedium({ children, path=null }) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (path !== null) {
      navigate(path)
    }
  }

  return (
    <motion.div
      className='panel-medium-wrap dropshadow panel-bg'
      onClick={handleNavigate}
      whileHover={{ scale: 1.015 }}
    >
        {children}
    </motion.div>
  )
}
