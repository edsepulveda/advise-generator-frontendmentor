import { useState, useEffect } from 'react'
import { getAdvice } from './hooks/useApi'
import './assets/index.css'
import MobilePattern from '../images/pattern-divider-mobile.svg'
import Dice from '../images/icon-dice.svg'
import DesktopPattern from '../images/pattern-divider-desktop.svg'

function App() {

  const [advise, setAdvise] = useState({
    advice: '',
    id: ''
  })

  const [disable, setDisable] = useState(false)

  const randomizeAdvice = async () => {
    const newAdvice = await getAdvice()
    setAdvise(newAdvice)
  }

  const handleClick = () =>{
    handleDisabled()
    randomizeAdvice()
  }


  //We use this handler, because you need 2 seconds for calling again the API
  //So we Prevent the user to click X times the button
  const handleDisabled = () => {
    setDisable(true)
    setTimeout(() => {
      setDisable(false)
    }, 2000);
  }

  useEffect(() => {
    const fetching = async () => {
      const adviceObject = await getAdvice()
      setAdvise(adviceObject) 
    }
    fetching()
  }, [])


  const {advice, id} = advise

  return (
      <div className="container">
        <div className='main-content'>
          <h2 className='heading'>Advice #{id}</h2> 
          <h1 className='advice'>"{advice}"</h1>
          <picture>
            <source srcSet={DesktopPattern} media="(min-width: 750px)"/>
            <img className='pattern' src={MobilePattern}/>
          </picture>
          <button onClick={handleClick} disabled={disable}><img src={Dice}/></button>
        </div>
      </div>
  )
}

export default App
