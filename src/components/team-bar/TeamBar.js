import { useState } from 'react'

// context
import { useGradientContext } from '../../contexts/gradient-context/useGradientContext'

// data
import { GRADIENT_DATA } from '../../data/gradient-data'
import { TEAM_LOGOS } from '../../data/team-data'

// styles
import './TeamBar.scss'

export default function TeamBar({ val, img, expanded=false, selectedTeamId}) {
    const [selectedTeam, setSelectedTeam] = useState(selectedTeamId)
    const { dispatch } = useGradientContext()

    const changeSelectedTeam = (team) => {
        const teamObj = GRADIENT_DATA[team]
        setSelectedTeam(team)
        dispatch({ type: 'PREVIEW_BG', payload: [teamObj, team]})
    }

    return (
        <div className={expanded ? 'team-bar-expanded-container panel-bg' : 'team-bar-container panel-bg'}>
            {!expanded && <>
                <img className="circle-img-left" src={img} alt="" />
                <h3>{val}</h3>
            </>}
            {expanded &&
                <div className='team-selection-container'>
                    {Object.keys(TEAM_LOGOS.current).map((key, index) => (
                        <div key={index} className={TEAM_LOGOS.current[key].teamID === selectedTeam ? 'team-circle selected dropshadow' : 'team-circle'} onClick={() => changeSelectedTeam(TEAM_LOGOS.current[key].teamID)}>
                            <img src={TEAM_LOGOS.current[key].logo} alt={TEAM_LOGOS.current[key].name}/>
                        </div>
                    ))}
                </div>
            }
        </div>
        )
}