import axios from 'axios'
import React, { useState } from 'react'

const OpenAiTesting = ({mistakes,topic,showBtnstate,setShowBtnState}) => {
  const [keywords,setKeywords] = useState([])
  const extract = async()=>{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          `I gave an interview of ${topic},below are the mentioned mistakes i did in that interview,please tell me the solution of these mistakes\n\n` +
          mistakes +
          '',
        temperature: 0.5,
        max_tokens: 80,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    };
    try {
      const response = await fetch(
      import.meta.env.VITE_OPENAI_API_URL,
      options
    );
    const json = await response.json();
    console.log(json);
    // console.log(json.choices[0].text.trim());
    setKeywords(json.choices[0].text.trim())
    setShowBtnState(false)
  } catch (error) {
    console.log(error);
  }
}
setShowBtnState(true)
  return (
    <React.Fragment>
    { showBtnstate  && <button onClick={extract} className='ask-gpt-btn' >Ask GPT</button>}
    <br />
    {keywords}
    </React.Fragment>
  )
}

export default OpenAiTesting