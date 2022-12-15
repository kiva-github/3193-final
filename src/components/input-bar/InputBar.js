// styles
import './InputBar.scss'

export default function InputBar({ type, pH="", value, updateValue }) {

  return (
      <input
          className='dropshadow panel-bg'
          type={type}
          onChange={(e) => updateValue(e.target.value)}
          style={{ borderRadius: '22px'}}
          placeholder={pH}
          value={value}
      >
      </input>
  )
}