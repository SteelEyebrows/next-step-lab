import React from 'react';

export default function Welcome() {
  return (
    <section style={{backgroundColor:'#fff',height:800}} className="section auth">
      <div style={{textAlign:'center'}}>
        <img src="mail.jpg" width="400" height="400" alt="hexal logo" />
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you a email. Please click on the confirmation link to verify your account.</p>
      </div>
    </section>
  )
}
