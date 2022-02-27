import React from 'react'
import { LOG_IN, SIGN_UP } from '../store/types'
import Login from './Login'

function LoginManager() {
  return (
    <div className="LoginManager">
        <Login type={LOG_IN} />
        <Login type={SIGN_UP} />

        <style>{`
            .LoginManager {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                border: outline;
                box-shadow: 1px 1px .6rem gray;
                padding: 3rem;
                outline: 1px solid lightgray;
                height: 70vh;
                margin: 3rem 5rem;
            }
        `}</style>

    </div>
  )
}

export default LoginManager